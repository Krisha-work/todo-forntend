import './home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-form">
          <div>
            <div className="home-header">
              <Link to={'/api/user/login'} className='user-link'><h1>Welcome to Daily Task App</h1></Link>
            </div>
           
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;
