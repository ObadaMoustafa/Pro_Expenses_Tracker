import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

function ProtectedPage() {
  //write code here
  const navigate = useNavigate();
  const { currentUser } = useContext(userContext);
  return <>{currentUser ? <Outlet /> : navigate("/login")}</>;
}

export default ProtectedPage;
