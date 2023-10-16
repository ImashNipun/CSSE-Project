import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/user/ProfilePage";

import useAuth from "./hook/useAuth";

function App() {
  const { auth } = useAuth();
  console.log(auth ? auth?.authenticated : "no auth");
  return (
    <Router>
      <Routes>
        {auth?.authenticated ? (
          <Route path="/" element={<ProfilePage />} />
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
