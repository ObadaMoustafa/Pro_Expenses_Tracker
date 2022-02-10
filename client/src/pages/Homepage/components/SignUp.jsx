import React, { useState } from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import LoadingOrError from "../../../components/loading&errors/LoadingOrError";
import useFetch from "../../../hooks/useFetch";
import fetchOptions from "../../../utils/fetchOptions";
import PropTypes from "prop-types";

function SignUp({ showLoginForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currency, setCurrency] = useState("");

  const { isLoading, error, performFetch } = useFetch(
    "/users/createUser",
    (res) => console.log(res.result)
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
      <form onSubmit={handleSignUp}>
        <label htmlFor="name">
          Name <span>*</span>
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">
          Email <span>*</span>
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">
          Password <span>*</span>
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirm-password">
          Confirm Password <span>*</span>
        </label>
        <input
          type="password"
          name="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <label htmlFor="currency">
          Currency <span>*</span>
        </label>
        <input
          type="text"
          name="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        />

        <PrimaryButton text="Sign up!" width="350px" />
      </form>
      <p>
        already has an account ..{" "}
        <p onClick={showLoginForm} className="hyper-link">
          login here
        </p>
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
  showLoginForm: PropTypes.func.isRequired,
};
export default SignUp;
