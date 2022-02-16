import React, { useContext, useState } from "react";
import LoadingOrError from "../../../components/loading&errors/LoadingOrError";
import { userContext } from "../../../context/userContext";
import useFetch from "../../../hooks/useFetch";
import fetchOptions from "../../../utils/fetchOptions";
import PropTypes from "prop-types";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

function Login({ showSignUpForm }) {
  //write code here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(userContext);
  const navigate = useNavigate();
  const { performFetch, isLoading, error } = useFetch(
    "/users/login",
    async (res) => {
      // const { name, email, currency } = res.result;
      await updateUser(res.result);
      navigate("/start");
    }
  );

  async function handleLogin(e) {
    e.preventDefault();
    const userInfo = { email, password };
    performFetch(fetchOptions("POST", userInfo));
  }

  return (
    <>
      <Form onSubmit={handleLogin}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="email@example.com"
          value={email}
          setValue={setEmail}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />
        <PrimaryButton text="Login" width="100%" />
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
