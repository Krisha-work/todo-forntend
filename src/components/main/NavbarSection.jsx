import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import "./navbarstyle.css";
import { useState } from "react";

const NavbarSection = () => {
  // const profileDetail = ["My Profile", "Change Password", "Logout"];

  const [stauts, setStauts] = useState(false);

  // const handleProfile = () => {
    // const myProfile = profileDetail[0]
    
    // profileDetail.map((item)=>{
    //   console.log(item,"------------");

    // })
    // if(myProfile  ) console.log(myProfile,"------------");
    
  // };

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
            <div className="profile">
              <div className="profile-icon">
                <FaUser
                  className="picon"
                  onClick={() => {
                    setStauts(!stauts);
                  }}
                />
                {/* <Nav className="me-auto">
                <Nav.Link as={Link} to="/api/user/register" >Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/api/user/login" >Login</Nav.Link>
                <Nav.Link as={Link} to="/todo">Todo</Nav.Link>
              </Nav> */}
              </div>
              {stauts ? (
              <div className="profile-popup">
                {/* {profileDetail.map((item) => {
                  return (
                    <>
                      <li onClick={handleProfile} key={item}>{item}</li>
                    </>
                  );
                })} */}
                <Link to={"/api/user/user "} className="profile-link-popup"><li>My Profile</li></Link>
                <Link className="profile-link-popup"><li>Change Password</li></Link>
                <Link className="profile-link-popup"><li>Logout</li></Link>
              </div>
               ) : null} 
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarSection;
