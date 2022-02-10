import React, { useContext, useState } from "react";
import LoadingOrError from "../../../components/loading&errors/LoadingOrError";
import { userContext } from "../../../context/userContext";
import useFetch from "../../../hooks/useFetch";
import fetchOptions from "../../../utils/fetchOptions";
import PropTypes from "prop-types";
import Form from "../../../components/Form/Form";
import Input from "../../../components/Form/Input";

function Login({ showSignUpForm }) {
  //write code here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(userContext);
  const { performFetch, isLoading, error } = useFetch(
    "/users/login",
    async (res) => {
      // const { name, email, currency } = res.result;
      await updateUser(res.result);
    }
  );

  async function handleLogin(e) {
    e.preventDefault();
    const userInfo = { email, password };
    performFetch(fetchOptions("POST", userInfo));
  }

  return (
    <>
      <Form onSubmit={handleLogin} text="Login" width="100%">
        <Input
          name="Email"
          type="email"
          placeHolder="email@example.com"
          value={email}
          setValue={setEmail}
        />
        <Input
          name="Password"
          type="password"
          placeHolder="Password"
          value={password}
          setValue={setPassword}
        />
      </Form>

      <p onClick={showSignUpForm} className="hyper-link">
        Or create a new account
      </p>

      <LoadingOrError
        isLoading={isLoading}
        isErr={error ? true : false}
        errMsg={error}
      />
    </>
  );
}
Login.propTypes = {
  showSignUpForm: PropTypes.func,
};
export default Login;
