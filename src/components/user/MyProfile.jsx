import { useEffect, useState } from "react";
import axios from "axios";
import "./myprofile.css";
// import validator from "validator";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
//   const [data, setData] = useState({});
  const [username, setUsername] = useState(false);
  const [email, setEmail] = useState(false);
  const [contact, setContact] = useState(false);

  const handleProfiledata = async () => {
    res = await axios.get("http://localhost:3000/api/user/userdata", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    console.log(res);
  };

  useEffect(() => {
    handleProfiledata();
  }, []);

  let res;

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(e.target.value)) {
      setEmail(true);
    } else {
      setEmail(false);
    }
  };

  const handleContact = (e) => {
    if(!/^[6-9]\d{9}$/i.test(e.target.value)){
        setContact(true)
      }
      else {
        setContact(false)
      }
  };

  const handleProfileUpdateData = async (e) => {

    e.preventDefault();

    console.log(username, email, contact);

    let id = localStorage.getItem("userid");

    console.log(id, "---------------------");

    const res = await axios.put(
      `http://localhost:3000/api/user/user/${id}`,
      {
        username: username,
        email: email,
        contact: contact,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(res, "--------");
    alert("update Successfully !!");
    navigate("");
  };
//   console.log(data);

  //   console.log(res.data.userData.username);

  return (
    <>
      <div className="profile-container">
        <div className="profile-form">
          <div>
            <form onSubmit={handleProfileUpdateData}>
              <div className="profile-header">
                <h1>My Profile</h1>
              </div>
              <div className="from-control">
                <input
                  type="text"
                  placeholder="Enter your name"
                  onChange={handleUsername}
                />
                <p className="error-mes"></p>
              </div>
              <div className="from-control">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your email"
                  onChange={handleEmail}
                />
                <p className="error-mes">
                  {email ? <p>Enter valid Email format.</p> : ""}
                </p>
              </div>
              <div className="from-control">
                <input
                  type="text"
                  placeholder="Enter your contact"
                  minLength={10}
                  maxLength={10}
                  onChange={handleContact}
                />
                <p className="error-mes">
                {contact ? <p>Contact must be 10 digit</p> : ""}
                </p>
              </div>
              <div className="profile-btn">
                <button>Update Profile</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
