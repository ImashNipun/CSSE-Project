import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config/config";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    authenticated: false,
  });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = localStorage.getItem("TOKEN_KEY");
        const user = localStorage.getItem("USER_DETAILS");

        if (token) {
          console.log(token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          setAuth({
            user: JSON.parse(user),
            token: token,
            authenticated: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadToken();
  }, []);

  const register = async (user_name, email, password) => {
    return await axios.post(`${config.BASE_URL}/api/v1/auth/register/`, {
      user_name,
      email,
      password,
    });
  };

  const login = async ({ email, password, user_type, temp_id }) => {
    try {
      let result = null;
      if (user_type === "local") {
        result = await axios.post(
          `${config.BASE_URL}/api/v1/auth/local/login`,
          {
            email,
            password,
          }
        );
      } else if (user_type === "foreign") {
        result = await axios.post(
          `${config.BASE_URL}/api/v1/auth/foreign/login`,
          {
            temp_id,
          }
        );
      }
      const user = result?.data?.data;

      setAuth({
        user: {
          email: user?.email,
          _id: user?._id,
          user_name: user?.user_name,
          user_type: user?.user_type,
          transaction_id: user?.transaction_id,
        },
        token: result?.data?.data?.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;


      const userDetails = JSON.stringify({
        email: user?.email,
        _id: user?._id,
        user_name: user?.user_name,
        user_type: user?.user_type,
        transaction_id: user?.transaction_id,
      });

      localStorage.setItem("TOKEN_KEY", result?.data?.data?.token);
      localStorage.setItem("USER_DETAILS", userDetails);
    } catch (error) {
      console.log(`${error.message}:`, error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("TOKEN_KEY");
      localStorage.removeItem("USER_DETAILS");
    } catch (error) {
      console.log(`${e.message}:`, error);
    }

    axios.defaults.headers.common["Authorization"] = "";
    setAuth({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
