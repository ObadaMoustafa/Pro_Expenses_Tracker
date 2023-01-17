import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { userContext } from "../context/userContext";
import RedirectPage from "./RedirectPage";

function ProtectedPage() {
  //write code here
  const { currentUser } = useContext(userContext);
  return (
    <>
      {currentUser ? (
        <Outlet />
      ) : (
        <RedirectPage
          msg1="you have to login first"
          msg2="redirecting to the login page within 4 seconds ..."
          href="/"
          timeout={4000}
        />
      )}
    </>
  );
}

export default ProtectedPage;
