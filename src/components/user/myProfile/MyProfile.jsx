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
import { IoCamera } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const MyProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [clearStauts, setClearStauts] = useState(false);
  const [profile, setProfile] = useState("");
  const [profileFile, setProfileFile] = useState(null);

  const navigate = useNavigate();

  const handleProfiledata = async () => {
    let res = await getUserRoute();
    console.log(res);
    setUsername(res.data.userData.username);
    setEmail(res.data.userData.email);
    setContact(res.data.userData.contact);
    let profileImage = res.data.userData.profile_image
    setProfileFile(profileImage);
    localStorage.setItem("profile_image", profileImage)
  };

  useEffect(() => {
    handleProfiledata();
  }, []);

  const id = localStorage.getItem("userid");

  const handleProfileUpdateData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("profile_image", profileFile);
    
    console.log(profileFile, "----*********------");
    
    // formData.append("profile_image", profileFile);
    // console.log(formData, "--------------");
    if (clearStauts) {
      const res = await updateUserRoute(id, formData
      //   {
      //   username: username,
      //   email: email,
      //   contact: contact,
      //   profile: profileFile,
      // }
    );
      console.log(res, "--------");
      toastMessage("success", res.data.message);
      setClearStauts(false);
      handleProfiledata()
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

  const handleImg = (e) => {
    const file = e.target.files[0];
    console.log(file.name, "----------file");

    if (file) {
      const fileURL = URL.createObjectURL(file); 
      // setProfile(fileURL);
      setProfileFile(fileURL);
    }
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-form">
          <div>
            <form
              onSubmit={handleProfileUpdateData}
              encType="multipart/form-data"
            >
              <div className="profile-header">
                <h1>My Profile</h1>
              </div>
              <div className="profile-logo">
                <div className="profile-image">
                  {profileFile ? (
                    <img src={profileFile} alt="Profile" />
                  ) : (
                    <div className="default-profile">
                      <FaUser className="default-user-icon" />
                    </div>
                  )}
                </div>
                <div className="add-btn">
                  <label htmlFor="profile_image">
                    <IoCamera className="pro-icon" />
                  </label>
                  <input
                    type="file"
                    id="profile_image"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      handleImg(e);
                      setClearStauts(true);
                    }}
                  />
                </div>
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
