import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import LoadingOrError from "../../../components/loading&errors/LoadingOrError";
import { userContext } from "../../../context/userContext";
import useFetch from "../../../hooks/useFetch";
import fetchOptions from "../../../utils/fetchOptions";

function Login() {
  //write code here
  const [successMsg, setSuccessMsg] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(userContext);
  const navigate = useNavigate();
  const { performFetch, isLoading, error } = useFetch(
    "/users/login",
    async (res) => {
      // const { name, email, currency } = res.result;
      await updateUser(res.result);
      navigate(`/start/${res.result._id}`);
      setSuccessMsg("Login successfully");
    }
  );

  async function handleLogin(e) {
    e.preventDefault();
    const userInfo = { email, password };
    performFetch(fetchOptions("POST", userInfo));
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PrimaryButton text="Login" width="350px" />
      </form>

      <Link to="/signup">
        <p>Or create a new account</p>
      </Link>

      <LoadingOrError
        isLoading={isLoading}
        isErr={error ? true : false}
        errMsg={error}
      />

      {successMsg && <div>{successMsg}</div>}
    </>
  );
}

export default Login;
