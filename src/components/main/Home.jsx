import { useEffect } from 'react';
import './home.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Home = () => {

  
  const navigate = useNavigate();

  const Token = localStorage.getItem("token");

  const handleLogin = () => {
    if(!Token){
      navigate("/user/login")
    }
  }

  useEffect(()=>{
    handleLogin()
  })

  return (
    <>
      <div className="home-container">
        <div className="home-form">
          <div>
            <div className="home-header">
              <Link className='user-link'><h1 onClick={handleLogin}>Welcome to Daily Task App</h1></Link>
            </div>
           
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;
