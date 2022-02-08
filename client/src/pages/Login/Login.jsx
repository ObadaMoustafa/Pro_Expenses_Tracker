import React from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";

function Login() {
  //write code here

  return (
    <>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="email">Password</label>
        <input type="password" name="password" id="password" />
        <PrimaryButton text="Login" width="350px" />
      </form>
    </>
  );
}

export default Login;
