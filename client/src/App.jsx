import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import PrimaryButton from "./components/buttons/PrimaryButton";
import Nav from "./components/Nav/Nav";
import { userContext } from "./context/userContext";
import "./style/App.css";

function App() {
  const { logout } = useContext(userContext);
  return (
    <>
      <Nav />
      <div className="app-container">
        <p>welcome from inside the app</p>
        <Outlet />
        <PrimaryButton onClick={logout} text="Logout" width="50%" />
      </div>
    </>
  );
}

export default App;
