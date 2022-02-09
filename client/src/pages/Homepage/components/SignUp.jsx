import React, { useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currency, setCurrency] = useState("");

  return (
    <>
      <form>
        <label htmlFor="name">
          Name <span>*</span>
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">
          Email <span>*</span>
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">
          Password <span>*</span>
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirm-password">
          Confirm Password <span>*</span>
        </label>
        <input
          type="password"
          name="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label htmlFor="currency">
          Currency <span>*</span>
        </label>
        <input
          type="text"
          name="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
        <PrimaryButton text="Sign up!" width="350px" />
      </form>
      <p>
        already has an account .. <Link to="/login">login here</Link>
      </p>
    </>
  );
}

export default SignUp;
