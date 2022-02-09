import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

function Login() {
  //write code here
  const {} = 

  return (
    <>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="email">Password</label>
        <input type="password" name="password" id="password" />
        <PrimaryButton text="Login" width="350px" />
      </form>
      <Link to="/signup">
        <p>Or create a new account</p>
      </Link>
    </>
  );
}

export default Login;
