import "./App.css";
// import Home from "./components/main/Home";
import MainBody from "./components/main/routes/MainBody";
import NavbarSection from "./components/main/navbar/NavbarSection";

function App() {
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
