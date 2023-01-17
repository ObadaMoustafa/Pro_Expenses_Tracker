import React, { useContext, useEffect, useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Form from "./Form";
import Input from "./Input";
import propTypes from "prop-types";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import LoadingOrError from "../loading_and_errors/LoadingOrError";
import fetchOptions from "../../utils/fetchOptions";

function EditPasswordForm({ setShouldShowFormFn }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { updateUser, currentUser } = useContext(userContext);
  const { performFetch, isLoading, error, cancelFetch } = useFetch(
    "/users/changePassword",
    res => {
      updateUser(res.result);
      setNewPassword("");
      setOldPassword("");
      setConfirmNewPassword("");
      setShouldShowFormFn(false);
    }
  );

  //cleanup the fetch request
  useEffect(() => {
    return () => cancelFetch();
    // eslint-disable-next-line
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const reqBody = {
      userId: currentUser._id,
      oldPassword,
      newPassword,
      confirmNewPassword,
    };
    performFetch(fetchOptions("PUT", reqBody));
  }
  return (
    <Form formHeader="Edit Password" formWidth="100%" onSubmit={handleSubmit}>
      <LoadingOrError
        isLoading={isLoading}
        errMsg={error}
        isErr={error ? true : false}
      />
      <Input
        type="password"
        label="Old password"
        placeholder="write old password"
        value={oldPassword}
        setValue={setOldPassword}
      />
      <Input
        type="password"
        label="New password"
        placeholder="write new password"
        value={newPassword}
        setValue={setNewPassword}
      />
      <Input
        type="password"
        label="Confirm new password"
        placeholder="confirm new password"
        value={confirmNewPassword}
        setValue={setConfirmNewPassword}
      />
      <PrimaryButton text="Save" width="150px" />
    </Form>
  );
}
EditPasswordForm.propTypes = {
  setShouldShowFormFn: propTypes.func,
};
export default EditPasswordForm;
