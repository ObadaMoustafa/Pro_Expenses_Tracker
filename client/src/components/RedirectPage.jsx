import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function RedirectPage({ success, msg1, msg2, href, timeout }) {
  //write code here
  const navigate = useNavigate();
  useEffect(() => {
    const navDuration = setTimeout(() => {
      navigate(href);
    }, timeout);

    return () => clearTimeout(navDuration);
  });

  return (
    <>
      <p>{success ? "success" : "Failed"}</p>
      <p>{msg1}</p>
      <p>{msg2}</p>
    </>
  );
}

RedirectPage.propTypes = {
  success: PropTypes.bool,
  msg1: PropTypes.string,
  msg2: PropTypes.string,
  href: PropTypes.string,
  timeout: PropTypes.number,
};
export default RedirectPage;
