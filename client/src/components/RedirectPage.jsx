import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function RedirectPage({ msg1, msg2, href, timeout }) {
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
      <p>{msg1}</p>
      <p>{msg2}</p>
    </>
  );
}

RedirectPage.propTypes = {
  msg1: PropTypes.string,
  msg2: PropTypes.string,
  href: PropTypes.string,
  timeout: PropTypes.number,
};
export default RedirectPage;
