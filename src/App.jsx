import "./App.css";
import { useEffect } from "react";
// import Home from "./components/main/Home";
import MainBody from "./components/main/routes/MainBody";
import NavbarSection from "./components/main/navbar/NavbarSection";

function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      {/* <div className="conatiner"> */}
      <NavbarSection />
      <MainBody />
      {/* </div> */}
    </>
  );
}

export default App;
