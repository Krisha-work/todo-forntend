import Login from "../user/Login";
import SignUp from "../user/SignUp";
// import Home from "./Home";
import Todo from "../todo/Todo";
import "./BodyPart.css";
import { Route, Routes } from "react-router";
import Home from "./Home";
import MyProfile from "../user/MyProfile";
import TodoUpdate from "../todo/todoUpdate";
import TodoAdd from "../todo/AddTodo";
import UpdatePass from "../user/UpdatePass";
import {ToastContainer } from "react-toastify";

const MainBody = () => {
 
  return (
    <>
      <div className="body-container">
        {/* <Login /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/update" element={<MyProfile />} />
          <Route path="/user/changepass" element={<UpdatePass />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/addtodo" element={<TodoAdd />} />
          <Route path="/todoupdate/:id" element={<TodoUpdate />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
};

export default MainBody;
