import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./navbarstyle.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const NavbarSection = () => {
  // const profileDetail = ["My Profile", "Change Password", "Logout"];

  const [stauts, setStauts] = useState(false);
  const [proStauts, setProStauts] = useState(false);

  const navigate = useNavigate();

  const Token = localStorage.getItem("token");

  const requireToken = (e) => {
    e.preventDefault();
    if (Token) {
      setStauts(false);
      navigate(`/user/update`);
    }
    // else {
    //   setStauts(false);
    //   toast.error("please first Login", {
    //     position: "bottom-right",
    //     autoClose: 1000,
    //   });
    // }
  };

  const Logout = async (e) => {
    e.preventDefault();
    if (Token) {
      localStorage.clear();
      console.log("--------> local storage clear <----------");
      navigate("/");
      toast.success("Logout Successfully", {
        position: "bottom-right",
        autoClose: 1000,
      });
      setStauts(false);
    } else {
      setStauts(false);
      toast.error("user already Logout", {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  };
  // const handleChangePass = (e) => {
  //   e.preventDefault();
  //   if (Token) {
  //     navigate("/user/changepass");
  //   }
  // };

  const todoPage = (e) => {
    e.preventDefault();
    if (Token) {
      setStauts(false);
      navigate("/todo");
    } else {
      setStauts(false);
      toast.error("please first Login", {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  };

  const userProfile = () => {
    if (Token) {
      setProStauts(true);
    } else {
      setProStauts(false);
    }
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
              <Navbar.Brand as={Link} to="/home">
                Daily Task
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
                      {/* <Link className="profile-link-popup">
                      <li onClick={handleChangePass}>Change Password</li>
                    </Link> */}
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
