import { useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import "./signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signupRoute } from "../../../api/user/index.js";
import { toastMessage } from "../../../utils/toastMessage.js";
import Input from "../../common/Input.jsx";
import Button from "../../common/Button.jsx";

const SignUp = () => {
  // const [value, setValue] = useState({
  //   username : '',
  //   email : '',
  //   password : ''
  //   confirmPass : '',
  //   contact : ''

  // })
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comparepPass, setComparePass] = useState("");
  const [contact, setContact] = useState("");
  const [passErr, setPassErr] = useState(false);
  // const [conPassErr, setConPassErr] = useState(false);
  const [stauts, setStauts] = useState(false);
  const [show, setShow] = useState(false);
  const [clearStauts, setClearStauts] = useState(false);
  const [stautsPass, setStautsPass] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setClearStauts(true);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setClearStauts(true);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setClearStauts(true);
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,20}$/i.test(
        password
      )
    )
      setPassErr(true);
    else setPassErr(false);
  };
  const handleComparePassword = (e) => {
    setComparePass(e.target.value);
    setClearStauts(true);
    // setConPassErr(true);
  };
  const handleContact = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setContact(value);
    setClearStauts(true);
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
        if (res.status == 201 || res.status == 409) {
          toastMessage("success", res.data.message);
          navigate("/login");
        }
      } else toastMessage("error", "Password Doesn't match");
    } catch (err) {
      if (err.status == 500) toastMessage("error", err.response.data.message);
    }
  };

  const clearAllFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setComparePass("");
    setContact("");
    setClearStauts(false);
  };

  return (
    <>
      <div className="user-container">
        <div className="user-form">
          <div>
            <form onSubmit={handleSignUpData}>
              <div className="user-header">
                <h1>SignUp</h1>
              </div>
              <Input
                type="text"
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={handleUsername}
              />
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmail}
              />
              <Input
                icon={
                  stauts ? (
                    <IoEyeOffSharp
                      onClick={handlePass}
                      className="signup-pass-icon"
                    />
                  ) : (
                    <IoEyeSharp
                      onClick={handlePass}
                      className="signup-pass-icon"
                    />
                  )
                }
                type={show ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePassword}
                minLength={8}
                error={passErr ? <p>Enter valid Password format.</p> : ""}
              />
              <Input
                icon={
                  stautsPass ? (
                    <IoEyeOffSharp
                      onClick={handleComparePass}
                      className="signup-pass-icon"
                    />
                  ) : (
                    <IoEyeSharp
                      onClick={handleComparePass}
                      className="signup-pass-icon"
                    />
                  )
                }
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Confirm password "
                value={comparepPass}
                onChange={handleComparePassword}
              />
              <Input
                type="text"
                placeholder="Enter contact "
                value={contact}
                onChange={handleContact}
                maxLength={10}
                minLength={10}
              />
              <Button name={"Sign Up"} />
              {clearStauts ? (
                <Button onClick={clearAllFields} name={"Clear"} />
              ) : null}
              <div className="signup-link">
                <Link to={"/login"} className="signup-nav">
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
