import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./components/nav/Nav";
import { DebtsProvider } from "./context/debtsContext";
import { ExpensesProvider } from "./context/expensesContext";
import "./style/App.css";
import "./style/App2.css";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("overview");
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <DebtsProvider>
        <ExpensesProvider>
          <Nav />
          <div className="app-container">
            <Outlet />
          </div>
        </ExpensesProvider>
      </DebtsProvider>
    </>
  );
}

export default App;
