import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LocalCustomerForm from "../components/auth/LocalCustomerForm";
import ForeignCustomerForm from "../components/auth/ForeignCustomerForm";
import useAuth from "../hook/useAuth";

const Login = () => {
  const { onLogin } = useAuth();
  const [loginType, setLoginType] = useState("email");

  const switchLoginType = (type) => {
    setLoginType(type);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="mb-4 flex justify-center p-3">
          <div className="border-2 border-black border-solid">
            <button
              onClick={() => switchLoginType("email")}
              className={`py-2 px-4 ${
                loginType === "email" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Local customer
            </button>
            <button
              onClick={() => switchLoginType("id")}
              className={`py-2 px-4  ${
                loginType === "id" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Foreign customer
            </button>
          </div>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            temp_id: "",
          }}
          validationSchema={
            loginType === "email"
              ? Yup.object({
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                  password: Yup.string().required("Required"),
                })
              : Yup.object({
                  temp_id: Yup.string()
                    .matches(/^\d{7}$/, "Invalid ID format")
                    .required("Required"),
                })
          }
          onSubmit={(values) => {
            // Handle form submission here
            if (loginType === "email") {
              onLogin({
                email: values.email,
                password: values.password,
                user_type:"local",
              });
            } else {
              onLogin({user_type:"foreign",temp_id: values.temp_id});
            }
          }}
        >
          <Form className="flex-1 items-center justify-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-60 min-h-0 md:min-h-full">
            <div>
              {loginType === "email" ? (
                <LocalCustomerForm />
              ) : (
                <ForeignCustomerForm />
              )}

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Log In
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
