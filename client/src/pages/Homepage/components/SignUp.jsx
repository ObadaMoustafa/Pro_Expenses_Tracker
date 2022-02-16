import React, { useContext, useState } from "react";
import LoadingOrError from "../../../components/loading&errors/LoadingOrError";
import useFetch from "../../../hooks/useFetch";
import fetchOptions from "../../../utils/fetchOptions";
import PropTypes from "prop-types";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import { userContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SplitFields from "../../../components/forms/SplitFields";

function SignUp({ showLoginForm }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currency, setCurrency] = useState("");
  const { updateUser } = useContext(userContext);
  const navigate = useNavigate();
  const { isLoading, error, performFetch } = useFetch(
    "/users/createUser",
    async (res) => {
      await updateUser(res.result);
      navigate("/start");
    }
  );

  function handleSignUp(e) {
    e.preventDefault();
    const reqBody = {
      name,
      email,
      password,
      confirmPassword,
      currency,
      gender,
    };
    performFetch(fetchOptions("POST", reqBody));
  }

  return (
    <>
      <Form onSubmit={handleSignUp}>
        <Input
          label="Name"
          placeholder="Name"
          name="name"
          value={name}
          setValue={setName}
        />

        <SplitFields>
          <Input
            label="Male"
            type="radio"
            name="gender"
            value="male"
            setValue={setGender}
            isRequired={false}
          />
          <Input
            label="Female"
            type="radio"
            name="gender"
            value="female"
            setValue={setGender}
            isRequired={false}
          />
        </SplitFields>
        <Input
          label="Email"
          placeholder="expamle@email.com"
          type="email"
          name="email"
          value={email}
          setValue={setEmail}
        />
        <Input
          label="Password"
          placeholder="Password"
          name="password"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <Input
          label="Confirm Password"
          placeholder="Confirm password"
          name="confirm password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          type="password"
        />
        <Input
          label="Currency"
          placeholder="EUR by default"
          name="currency"
          value={currency}
          setValue={setCurrency}
          isRequired={false}
        />
        <PrimaryButton text="Sign up!" width="100%" />
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
