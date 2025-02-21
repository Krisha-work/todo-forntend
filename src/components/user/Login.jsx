import { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [emailOrContact, setEmailOrContact] = useState("");
  const [password, setPassword] = useState("");
  const [stauts, setStauts] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  function handleEmailOrContact(e) {
    setEmailOrContact(e.target.value)
    // if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(e.target.value)) {
    //   setEmailOrContact(e.target.value);
    // } 
  }

  function handlePassword(e) {
    setPassword(e.target.value)
    // if (
    //   !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(
    //     e.target.value
    //   )
    // ) {
    //   setPassword(true);
    // } else {
    //   setPassword(false);
    // }
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

    console.log();
    

    const res = await axios.post("http://localhost:3000/api/user/login", {
      emailOrContact: emailOrContact,
      password: password,
    });
    console.log(res, "--------");
    let tokendata = res.data.token;
    let userId = res.data.user.id;

    console.log(tokendata, "-------------------------------");
    console.log(userId, "-------------------------------");

    localStorage.setItem("token", tokendata);
    localStorage.setItem("userid", userId);

    alert("login Successfully !!");
    navigate("/api/todo/todoadd");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <div>
            <form>
              <div className="login-header">
                <h1>Login</h1>
              </div>
              <div className="from-control">
              <input
                  type="text"
                  name="email"
                  placeholder="Enter Your email"
                  onChange={handleEmailOrContact}
                  required
                />
                <p className="login-error-mes">
                  {/* {emailOrContact ? <p>Enter valid Email format.</p> : ""} */}
                </p>
              </div>
              <div className="from-control">
                {stauts ? (
                  <IoEyeSharp
                    onClick={btnHandler}
                    className="login-pass-icon"
                  />
                ) : (
                  <IoEyeOffSharp
                    onClick={btnHandler}
                    className="login-pass-icon"
                  />
                )}
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handlePassword}
                  required
                />
                <p className="login-error-mes">
                  {/* {password ? <p>Enter valid Password format.</p> : ""} */}
                </p>
              </div>
              <div className="login-btn">
                <button onClick={handleLoginData}>Login</button>
              </div>
              <div className="login-link">
                <Link to={"/api/user/register"} className="login-nav">
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
