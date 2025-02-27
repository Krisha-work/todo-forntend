import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { loginRoute } from "../../api/user/index.js";
import "./login.css";
import { toast } from "react-toastify";

const Login = () => {
  const [emailOrContact, setEmailOrContact] = useState("");
  const [password, setPassword] = useState("");
  const [stauts, setStauts] = useState(false);
  const [show, setShow] = useState(false);
  const [clearStauts, setClearStauts] = useState(false);

  const Token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (Token) {
      navigate("/home");
    }
  };

  const handleButtonStatus = () => {
    if (emailOrContact || password) {
      setClearStauts(true);
    } else {
      setClearStauts(false);
    }
  };

  useEffect(() => {
    handleLogin();
    handleButtonStatus();
  });

  function handleEmailOrContact(e) {
    setEmailOrContact(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
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

        console.log(tokendata, "-------------", userId, "------------");
        console.log(userId, "------------");

        localStorage.setItem("token", tokendata);
        localStorage.setItem("userid", userId);

        if (tokendata) {
          toast.success(res.data.message, {
            position: "bottom-right",
            autoClose: 1000,
          });
          navigate("/todo");
        }
      }
      if (res.status == 401) {
        toast.error(res.data.message, {
          position: "bottom-right",
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
      if (err.status == 500) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message, {
          position: "bottom-right",
          autoClose: 1000,
        });
      }
    }
  };

  const clearAllFields = () => {
    setEmailOrContact("");
    setPassword("");
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
              <div className="from-control">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your email"
                  value={emailOrContact}
                  onChange={handleEmailOrContact}
                  required
                />
                <p className="login-error-mes">
                  {/* {emailOrContact ? <p>Enter valid Email format.</p> : ""} */}
                </p>
              </div>
              <div className="from-control">
                {stauts ? (
                  <IoEyeOffSharp
                    onClick={btnHandler}
                    className="signup-pass-icon"
                  />
                ) : (
                  <IoEyeSharp
                    onClick={btnHandler}
                    className="signup-pass-icon"
                  />
                )}
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  minLength={8}
                  // pattern={/[\d]/}
                  onChange={handlePassword}
                  required
                />
                <p className="login-error-mes">
                  {/* {password ==  ? <p>Enter valid Password format.</p> : ""} */}
                </p>
              </div>
              <div className="login-btn">
                <button>Login</button>
              </div>
              {clearStauts ? (
                <div className="login-btn">
                  <button onClick={clearAllFields}>Clear</button>
                </div>
              ) : null}
              <div className="login-link">
                <Link to={"/user/signup"} className="login-nav">
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
