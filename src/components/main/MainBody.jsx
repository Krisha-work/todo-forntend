import Login from "../user/Login";
import SignUp from "../user/SignUp";
// import Home from "./Home";
import Todo from "../todo/Todo";
import "./BodyPart.css";
import { Route, Routes } from "react-router";
import Home from "./Home";
import MyProfile from "../user/MyProfile";

const MainBody = () => {
 
  return (
    <>
      <div className="body-container">
        {/* <Login /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/api/user/register" element={<SignUp />} />
          <Route path="/api/user/login" element={<Login />} />
          <Route path="/api/user/user" element={<MyProfile />} />
          <Route path="/api/todo/todoadd" element={<Todo />} />
        </Routes>
      </div>
    </>
  );
};

export default MainBody;
