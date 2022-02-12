import React, { useContext, useState } from "react";
import LoadingOrError from "../../../components/loading&errors/LoadingOrError";
import useFetch from "../../../hooks/useFetch";
import fetchOptions from "../../../utils/fetchOptions";
import PropTypes from "prop-types";
import Form from "../../../components/Form/Form";
import Input from "../../../components/Form/Input";
import { userContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

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
      <Form onSubmit={handleSignUp} text="Sign up!" width="100%">
        <Input
          label="Name"
          placeholder="Name"
          name="name"
          value={name}
          setValue={setName}
        />

        <div
          style={{
            display: "flex",
            columnGap: "20px",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
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
        </div>
        {/* <label>male</label>
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={changeGender}
        />
        <label>female</label>
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={changeGender}
        /> */}

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
          label="favorite Currency"
          placeholder="EUR by default"
          name="currency"
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
