import React from "react";
import { Outlet } from "react-router-dom";
// import PropTypes from "prop-types";

function Homepage() {
  //write code here

  return (
    <div className="homepage-container">
      <Outlet />
    </div>
  );
}

// Homepage.propTypes = {};
export default Homepage;
