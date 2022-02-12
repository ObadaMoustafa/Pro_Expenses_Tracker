import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import "./style/App.css";

function App() {
  const navigate = useNavigate();
  useEffect(() => navigate("overview"), []);
  return (
    <>
      <Nav />
      <div className="app-container">
        <Outlet />
      </div>
    </>
  );
}

export default App;
