import * as React from "react";
import { Outlet } from "react-router-dom";
import "./style/App.css";

function App() {
  return (
    <div className="app-container">
      <p>welcome from inside the app</p>
      <Outlet />
    </div>
  );
}

export default App;
