import Page from "../../common/Page";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const Token = localStorage.getItem("token");

  return (
    <>
      <Page
        pageTitle={
          <h1
            onClick={() => {
              Token ? navigate("/todo") : navigate("/login");
            }}
          >
            Welcome to Daily Task App
          </h1>
        }
      />
    </>
  );
};

export default Home;
