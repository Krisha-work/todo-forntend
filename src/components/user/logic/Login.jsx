import { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { loginRoute } from "../../../api/user/index.js";
import "./login.css";
import { toastMessage } from "../../../utils/toastMessage.js";
import Input from "../../common/Input.jsx";
import Button from "../../common/Button.jsx";

const Login = () => {
  const [emailOrContact, setEmailOrContact] = useState("");
  const [password, setPassword] = useState("");
  const [stauts, setStauts] = useState(false);
  const [show, setShow] = useState(false);
  const [clearStauts, setClearStauts] = useState(false);

  const navigate = useNavigate();

  function handleEmailOrContact(e) {
    setEmailOrContact(e.target.value);
    setClearStauts(true);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    setClearStauts(true);
  }

  const btnHandler = () => {
    if (stauts == true) {
      setStauts(false);
      setShow(false);
    } else {
      setStauts(true);
      setShow(true);
    }
  };

  const handleLoginData = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      const res = await loginRoute({
        emailOrContact: emailOrContact,
        password: password,
      });
      console.log(res, "--------");
      if (res.status == 200) {
        let tokendata = res.data.token;
        let userId = res.data.user.id;

        localStorage.setItem("token", tokendata);
        localStorage.setItem("userid", userId);

        if (tokendata) {
          toastMessage("success", res.data.message);
          navigate("/todo");
        }
      }
      if (res.status == 401) toastMessage("error", res.data.message);
    } catch (err) {
      console.log(err);
      if (err.status == 500) toastMessage("error", err.response.data.message);
    }
  };

  const clearAllFields = () => {
    setEmailOrContact("");
    setPassword("");
    setClearStauts(false);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <div>
            <form onSubmit={handleLoginData}>
              <div className="login-header">
                <h1>Login</h1>
              </div>
              <Input
                type="email"
                name="email"
                placeholder="Enter Your email"
                value={emailOrContact}
                onChange={handleEmailOrContact}
              />
              <Input
                icon={
                  stauts ? (
                    <IoEyeOffSharp
                      onClick={btnHandler}
                      className="signup-pass-icon"
                    />
                  ) : (
                    <IoEyeSharp
                      onClick={btnHandler}
                      className="signup-pass-icon"
                    />
                  )
                }
                type={show ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={password}
                minLength={8}
                onChange={handlePassword}
              />
              <Button name={"Login"} />
              {clearStauts ? (
                <Button onClick={clearAllFields} name={"Clear"} />
              ) : null}
              <div className="login-link">
                <Link to={"/signup"} className="login-nav">
                  <p>Do not have an account ?</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
