import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Homepage from "./pages/Homepage/Homepage";
import WelcomeMsg from "./pages/Homepage/components/WelcomeMsg";
import Login from "./pages/Homepage/components/Login";
import SignUp from "./pages/Homepage/components/SignUp";
import { UserProvider } from "./context/userContext";
import ProtectedPage from "./components/ProtectedPage";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path="/" element={<WelcomeMsg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route exact path="/start/:userId" element={<ProtectedPage />}>
          <Route path="/start/:userId" element={<App />}></Route>
        </Route>
      </Routes>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
