import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserRoute,
  updateUserRoute,
  deleteUserRoute,
} from "../../../api/user/index.js";
import "./myprofile.css";
import { toastMessage } from "../../../utils/toastMessage.js";
import Input from "../../common/Input.jsx";
import Button from "../../common/Button.jsx";

const MyProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [clearStauts, setClearStauts] = useState(false);

  const navigate = useNavigate();

  const handleProfiledata = async () => {
    let res = await getUserRoute();
    console.log(res);
    setUsername(res.data.userData.username);
    setEmail(res.data.userData.email);
    setContact(res.data.userData.contact);
  };

  useEffect(() => {
    handleProfiledata();
  }, []);

  const id = localStorage.getItem("userid");

  const handleProfileUpdateData = async (e) => {
    e.preventDefault();
    if (clearStauts) {
      const res = await updateUserRoute(id, {
        username: username,
        email: email,
        contact: contact,
      });
      console.log(res, "--------");
      toastMessage("success", res.data.message);
      setClearStauts(false);
    }
  };

  const closeAccount = async () => {
    try {
      const res = await deleteUserRoute(id);
      console.log(res, "--------");
      if (res.status == 200) {
        localStorage.clear();
        toastMessage("success", res.data.message);
        navigate("/login");
      }
      if (res.status == 405) toastMessage("error", res.data.message);
    } catch (err) {
      if (err.status == 500) toastMessage("error", err.response.data.message);
    }
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-form">
          <div>
            <form onSubmit={handleProfileUpdateData}>
              <div className="profile-header">
                <h1>My Profile</h1>
              </div>
              <Input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setClearStauts(true);
                }}
              />
              <Input
                type="email"
                name="email"
                placeholder="Enter Your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                type="text"
                placeholder="Enter your contact"
                minLength={10}
                maxLength={10}
                value={contact}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setContact(value);
                  setClearStauts(true);
                }}
              />
              <Button name={"Update Profile"} />
            </form>
            <Button onClick={closeAccount} name={"Close Account"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
