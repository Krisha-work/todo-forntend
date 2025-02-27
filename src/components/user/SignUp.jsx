import { useState, useEffect } from "react";
// import axios from "axios";
// import { BiHide } from "react-icons/bi";
import { toast } from "react-toastify";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import "./signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signupRoute } from "../../api/user/index.js";
// import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email : "",
  //   password : "",
  //   contact : ""
  // })
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comparepPass, setComparePass] = useState("");
  const [contact, setContact] = useState("");
  // const [nameErr, setNameErr] = useState(false);
  // const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  // const [conPassErr, setConPassErr] = useState(false);
  // const [conErr, setConErr] = useState(false);
  const [stauts, setStauts] = useState(false);
  const [show, setShow] = useState(false);
  const [clearStauts, setClearStauts] = useState(false);
  const [stautsPass, setStautsPass] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const Token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (Token) {
      navigate("/home");
    }
  };

  const handleButtonStatus = () => {
    if (username || email || password || comparepPass || contact) {
      setClearStauts(true);
    } else {
      setClearStauts(false);
    }
  };

  useEffect(() => {
    handleLogin();
    handleButtonStatus();
  });

  // const handleData = (e) => {
  //   setUsername(e.target.value);
  //   setEmail(e.target.value);
  //   setPassword(e.target.value);
  //   setContact(e.target.value);
  // }

  const handleUsername = (e) => {
    setUsername(e.target.value);
    // if (!username) setNameErr(true);
    // else setNameErr(false);
    // console.log(e, "---", e.target.name, "----", e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email)) setEmailErr(true);
    // else setEmailErr(false);
    // console.log(e, "---", e.target, "----", e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
        password
      )
    )
      setPassErr(true);
    else setPassErr(false);
  };
  const handleComparePassword = (e) => {
    setComparePass(e.target.value);
    // if (comparepPass == password) setConPassErr(false);
    // else setConPassErr(true);
  };
  const handleContact = (e) => {
    setContact(e.target.value);
    // if (!/^(?=.*\d)[\d]{9}$/i.test(contact)) setConErr(true);
    // else setConErr(false);
  };

  const handlePass = () => {
    if (stauts == true) {
      setStauts(false);
      setShow(false);
    } else {
      setStauts(true);
      setShow(true);
    }
  };

  const handleComparePass = () => {
    if (stautsPass == true) {
      setStautsPass(false);
      setShowPass(false);
    } else {
      setStautsPass(true);
      setShowPass(true);
    }
  };

  const handleSignUpData = async (e) => {
    e.preventDefault();

    try {
      if (password == comparepPass) {
        const res = await signupRoute({
          username: username,
          email: email,
          password: password,
          contact: contact,
        });
        console.log(res, "--------");
        if (res.status == 200 || res.status == 409) {
          console.log(res.data.message);
          toast.success(res.data.message, {
            position: "bottom-right",
            autoClose: 1000,
          });
          navigate("/user/login");
        }
        // if (res.status == 400) {
        //   console.log(res.data.message);
        //   toast.error(res.data.message , {
        //     position: "bottom-right",
        //     autoClose: 1000,
        //   });

        //   // navigate("/user/login");
        // }
      }
      else {
        toast.success("Password Doesn't match", {
          position: "bottom-right",
          autoClose: 1000,
        });
      }
    } catch (err) {
      // console.log(err, "------");
      // if (err.status == 400) {
      //   console.log("---error---");
      //   console.log(err.response.data.message);
      //   toast.error(err.response.data.message + " so please Login", {
      //     position: "bottom-right",
      //     autoClose: 1000,
      //   });

      //   // navigate("/user/login");
      // }
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
    setUsername("");
    setEmail("");
    setPassword("");
    setComparePass("");
    setContact("");
  };

  return (
    <>
      <div className="sign-up-container">
        <div className="signup-form">
          <div>
            <form onSubmit={handleSignUpData}>
              <div className="sign-header">
                <h1>SignUp</h1>
              </div>
              <div className="from-control">
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsername}
                  required
                />
                <p className="error-mes">
                  {/* {nameErr ? <p>Enter username.</p> : null} */}
                </p>
              </div>
              <div className="from-control">
                <input
                  type="test"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmail}
                  required
                />
                <p className="error-mes">
                  {/* {emailErr ? <p>Enter valid Email format.</p> : null} */}
                </p>
              </div>
              <div className="from-control">
                {stauts ? (
                  <IoEyeOffSharp
                    onClick={handlePass}
                    className="signup-pass-icon"
                  />
                ) : (
                  <IoEyeSharp
                    onClick={handlePass}
                    className="signup-pass-icon"
                  />
                )}
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePassword}
                  // minLength={8}
                  // pattern={/[A-Za-z\d@$!%*#?&]{8,20}/}
                  required
                />
                <p className="error-mes">
                  {passErr ? <p>Enter valid Password format.</p> : ""}
                </p>
              </div>
              <div className="from-control">
                {stautsPass ? (
                  <IoEyeOffSharp
                    onClick={handleComparePass}
                    className="signup-pass-icon"
                  />
                ) : (
                  <IoEyeSharp
                    onClick={handleComparePass}
                    className="signup-pass-icon"
                  />
                )}
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Confirm password "
                  value={comparepPass}
                  onChange={handleComparePassword}
                  minLength={8}
                  required
                />
                <p className="error-mes">
                  {comparepPass !== password ? <p>Password not match</p> : ""}
                </p>
              </div>
              <div className="from-control">
                <input
                  type="number"
                  placeholder="Enter contact "
                  value={contact}
                  onChange={handleContact}
                  minLength={10}
                  max={10}
                  // pattern={/[\d]/}
                  required
                />
                <p className="error-mes">
                  {/* {conErr ? <p>Contact must be 10 digit</p> : ""} */}
                </p>
              </div>
              <div className="signup-btn">
                <button>Sign Up</button>
              </div>
              {clearStauts ? (
                <div className="signup-btn">
                  <button onClick={clearAllFields}>Clear</button>
                </div>
              ) : null}
              <div className="signup-link">
                <Link to={"/user/login"} className="signup-nav">
                  <p>Already have an account ?</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
