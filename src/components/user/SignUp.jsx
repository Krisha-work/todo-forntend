import { useState } from "react";
import axios from "axios";
// import { BiHide } from "react-icons/bi";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import "./signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  // const [emailErr, setEmailErr] = useState(false);
  const [stauts, setStauts] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
   setEmail(e.target.value)
  };
  const handlePassword = (e) => {
      setPassword(e.target.value);
  };
  const handleContact = (e) => {
      setContact(e.target.value)
  };

  // const validEmail = () => {
  //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email)) setEmailErr(true)
  //   else setEmailErr(false)
  // }

  const btnHandler = () => {
    if (stauts == true) {
      setStauts(false);
      setShow(false);
    } else {
      setStauts(true);
      setShow(true);
    }
  };

  const handleSignUpData = async (e) => {
    e.preventDefault();
    console.log(username, email, password, contact);

    const res = await axios.post("http://localhost:3000/api/user/register", {
      username: username,
      email: email,
      password: password,
      contact: contact,
    });
    console.log(res, "--------");
    alert("SignUp Successfully !!");
    navigate("/api/user/login");
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
                  placeholder="Enter your name"
                  onChange={handleUsername}
                  required
                />
                <p className="error-mes">
                </p>
              </div>
              <div className="from-control">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your email"
                  onChange={handleEmail}
                  required
                />
                <p className="error-mes">
                  {/* {email ? <p>Enter valid Email format.</p> : ""} */}
                </p>
              </div>
              <div className="from-control">
                {stauts ? (
                  <IoEyeSharp
                    onClick={btnHandler}
                    className="signup-pass-icon"
                  />
                ) : (
                  <IoEyeOffSharp
                    onClick={btnHandler}
                    className="signup-pass-icon"
                  />
                )}
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handlePassword}
                  minLength={8}
                  // pattern={/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/}
                  required
                />
                <p className="error-mes">
                {/* {password ? <p>Enter valid Password format.</p> : ""} */}
                </p>
              </div>
              <div className="from-control">
                <input
                  type="text"
                  placeholder="Enter your contact"
                  onChange={handleContact}
                  minLength={10}
                  maxLength={10}
                  required
                />
                <p className="error-mes">
                {/* {contact ? <p>Contact must be 10 digit</p> : ""} */}
                </p>
              </div>
              <div className="signup-btn">
                <button>Sign Up</button>
              </div>
              <div className="signup-link">
                <Link to={"/api/user/login"} className="signup-nav">
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
