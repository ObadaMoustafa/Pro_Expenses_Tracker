import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { userContext } from "../../context/userContext";
// import PropTypes from "prop-types";

function Homepage() {
  //write code here
  const { currentUser } = useContext(userContext);
  return (
    <>
      {currentUser ? (
        <Navigate to={`/start/${currentUser._id}`} />
      ) : (
        <div className="homepage-container">
          <Outlet />
        </div>
      )}
    </>
  );
}

// Homepage.propTypes = {};
export default Homepage;
