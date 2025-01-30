import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import AddQuestionPage from "../pages/AddQuestionPage";

function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/addQuestion" element={<AddQuestionPage />}></Route>
    </Routes>
  );
}

export default RouterConfig;
