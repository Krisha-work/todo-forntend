import Login from "../../user/logic/Login";
import SignUp from "../../user/signup/SignUp";
import Todo from "../../todo/Todo";
import { Route, Routes } from "react-router";
import Home from "../home/Home";
import MyProfile from "../../user/myProfile/MyProfile";
import TodoUpdate from "../../todo/todoUpdate/TodoUpdate";
import TodoAdd from "../../todo/todoAdd/AddTodo";
import UpdatePass from "../../user/updatePassword/UpdatePass";
import PageNotFound from "../home/PageNotFound";
import PrivateRoutes from "./PrivateRoute";
import CommonRoute from "./CommonRoute";  
import DemoInput from "../../common/DemoInput";
import { ToastContainer } from "react-toastify";

const MainBody = () => {

  return (
    <>
      <div className="body-container">
        <Routes>
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<DemoInput />} />
          <Route exact element={<PrivateRoutes />}>
            <Route exact path="/myprofile" element={<MyProfile />} />
            <Route exact path="/updatepassword" element={<UpdatePass />} />
            <Route exact path="/todo" element={<Todo />} />
            <Route exact path="/addtodo" element={<TodoAdd />} />
            <Route exact path="/todoupdate/:id" element={<TodoUpdate />} />
          </Route>
          <Route exact element={<CommonRoute />}>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
};

export default MainBody;
