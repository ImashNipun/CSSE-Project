import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/user/ProfilePage";
import Layout from "./layout/Layout";
import WalletPage from "./pages/wallet/WalletPage";
import HomePage from "./pages/HomePage";

import useAuth from "./hook/useAuth";

function App() {
  const { auth } = useAuth();
  console.log(auth ? auth?.authenticated : "no auth");
  return (
    <Router>
      <Routes>
        {auth?.authenticated ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="wallet" element={<WalletPage />} />
          </Route>
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
