import React, { useContext, useState } from "react";
import LoadingOrError from "../../../components/loading&errors/LoadingOrError";
import useFetch from "../../../hooks/useFetch";
import fetchOptions from "../../../utils/fetchOptions";
import PropTypes from "prop-types";
import Form from "../../../components/Form/Form";
import Input from "../../../components/Form/Input";
import { userContext } from "../../../context/userContext";

function SignUp({ showLoginForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currency, setCurrency] = useState("");
  const { updateUser } = useContext(userContext);

  const { isLoading, error, performFetch } = useFetch(
    "/users/createUser",
    (res) => updateUser(res.result)
  );

  function handleSignUp(e) {
    e.preventDefault();
    const reqBody = {
      name,
      email,
      password,
      confirmPassword,
      currency,
    };
    performFetch(fetchOptions("POST", reqBody));
  }

  return (
    <>
      <Form onSubmit={handleSignUp} text="Sign up!" width="100%">
        <Input placeHolder="Name" name="Name" value={name} setValue={setName} />
        <Input
          placeHolder="expamle@email.com"
          type="email"
          name="Email"
          value={email}
          setValue={setEmail}
        />
        <Input
          placeHolder="Password"
          name="Password"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <Input
          placeHolder="Confirm password"
          name="Confirm password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          type="password"
        />
        <Input
          placeHolder="EUR by default"
          name="Currency"
          value={currency}
          setValue={setCurrency}
          isRequired={false}
        />
      </Form>
      <p onClick={showLoginForm} className="hyper-link">
        already has an account .. login here
      </p>
      <LoadingOrError
        isLoading={isLoading}
        isErr={error ? true : false}
        errMsg={error}
      />
    </>
  );
}
SignUp.propTypes = {
  showLoginForm: PropTypes.func,
};
export default SignUp;
