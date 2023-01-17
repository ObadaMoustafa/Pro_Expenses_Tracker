import React from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";
import ErrorMsg from "./ErrorMsg";

function LoadingOrError({ isLoading, isErr, errMsg }) {
  //write code here

  return (
    <>
      {isLoading && <Loading />}
      {isErr && <ErrorMsg errMsg={errMsg} />}
    </>
  );
}

LoadingOrError.propTypes = {
  isLoading: PropTypes.bool,
  isErr: PropTypes.bool,
  errMsg: PropTypes.string,
};
export default LoadingOrError;
