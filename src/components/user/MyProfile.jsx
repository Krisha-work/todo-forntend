import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserRoute,
  updateUserRoute,
  deleteUserRoute,
} from "../../api/user/index.js";
import "./myprofile.css";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [clearStauts, setClearStauts] = useState(false);

  // const Token = localStorage.getItem("token");
  // console.log(Token, "----- token -----");

  const navigate = useNavigate();

  // const handleLogin = () => {
  //   if (!Token) {
  //     navigate("/");
  //   }
  // };

  const handleButtonStatus = () => {
    if (username || email || contact) {
      setClearStauts(true);
    } else {
      setClearStauts(false);
    }
  };

  useEffect(() => {
    // handleLogin();
    handleButtonStatus();
  });

  const handleProfiledata = async () => {
    let res = await getUserRoute();
    // headers: {
    //   authorization: localStorage.getItem("token"),
    // },
    console.log(res);
    setUsername(res.data.userData.username);
    setEmail(res.data.userData.email);
    setContact(res.data.userData.contact);
  };

  useEffect(() => {
    handleProfiledata();
  }, []);

  const handleProfileUpdateData = async (e) => {
    e.preventDefault();

    let id = localStorage.getItem("userid");
    console.log(id, "---------------------");

    const res = await updateUserRoute(
      id,
      {
        username: username,
        email: email,
        contact: contact,
      }
      // {
      //   headers: {
      //     authorization: localStorage.getItem("token"),
      //   },
      // }
    );
    console.log(res, "--------");
    toast.success(res.data.message, {
      position: "bottom-right",
      autoClose: 1000,
    });
    // navigate("/todo");
  };

  let id = localStorage.getItem("userid");

  const closeAccount = async () => {
    try {
      console.log(id, "---------------------");
      // if (window.confirm("Are you sure you want to delete this recode ?")) {

        const res = await deleteUserRoute(id);

        console.log(res, "--------");
        // alert("User Logout Successfully !!");
        if (res.status == 200) {
          localStorage.clear();
          toast.success(res.data.message, {
            position: "bottom-right",
            autoClose: 1000,
          });
          navigate("/home");
        }
        if (res.status == 405) {
          toast.error(res.data.message, {
            position: "bottom-right",
            autoClose: 1000,
          });
        }
      // }
    } catch (err) {
      if (err.status == 500) {
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
    setContact("");
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
              <div className="from-control">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
                <p className="error-mes"></p>
              </div>
              <div className="from-control">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <p className="error-mes">
                  {/* {email ? <p>Enter valid Email format.</p> : ""} */}
                </p>
              </div>
              <div className="from-control">
                <input
                  type="text"
                  placeholder="Enter your contact"
                  minLength={10}
                  maxLength={10}
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                  required
                />
                <p className="error-mes">
                  {/* {contact ? <p>Contact must be 10 digit</p> : ""} */}
                </p>
              </div>
              <div className="profile-btn">
                <button>Update Profile</button>
              </div>
            </form>
            {clearStauts ? (
              <div className="account-btn">
                <button onClick={clearAllFields}>Clear</button>
              </div>
            ) : null}
            <div className="account-btn">
              <button onClick={closeAccount}>Close Account</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
