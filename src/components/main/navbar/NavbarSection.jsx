import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./navbarstyle.css";
import { toastMessage } from "../../../utils/toastMessage";

const NavbarSection = () => {
  const [stauts, setStauts] = useState(false);
  const [proStauts, setProStauts] = useState(false);

  const navigate = useNavigate();

  const Token = localStorage.getItem("token");

  const requireToken = (e) => {
    e.preventDefault();
    setStauts(false);
    navigate("/myprofile");
  };

  const Logout = async (e) => {
    e.preventDefault();
    localStorage.clear();
    console.log("--------> local storage clear <----------");
    navigate("/");
    toastMessage("success", "Logout Successfully");
    setStauts(false);
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    navigate("/updatepassword");
  };

  const todoPage = (e) => {
    e.preventDefault();
    setStauts(false);
    navigate("/todo");
  };

  const userProfile = () => {
    if (Token) setProStauts(true);
    else setProStauts(false);
  };

  useEffect(() => {
    userProfile();
  });

  return (
    <>
      <Navbar className="navbar-section" data-bs-theme="dark">
        <Container>
          <div className="nav-container">
            <div>
              <Navbar.Brand as={Link} to="/">
               <h3>Daily Task</h3> 
              </Navbar.Brand>
            </div>
            {proStauts ? (
              <div
                className="profile"
                onClick={() => {
                  setStauts(!stauts);
                }}
              >
                <div className="profile-icon">
                  <FaUser className="picon" />
                </div>
                {stauts ? (
                  <div>
                    <div className="profile-popup">
                      <Link className="profile-link-popup">
                        <li onClick={requireToken}>My Profile</li>
                      </Link>
                      <Link className="profile-link-popup">
                        <li onClick={handleChangePass}>Change Password</li>
                      </Link>
                      <Link className="profile-link-popup">
                        <li onClick={todoPage}>Todo</li>
                      </Link>
                      <Link className="profile-link-popup">
                        <li onClick={Logout}>Logout</li>
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarSection;
