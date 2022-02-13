import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";
// import PropTypes from "prop-types";

function Homepage() {
  //write code here
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) navigate("/start");
  }, []);
  return (
    <>
      <div className="homepage-container">
        <Outlet />
      </div>
    </>
  );
}

// Homepage.propTypes = {};
export default Homepage;
