import React, { useContext, useEffect, useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Form from "./Form";
import Input from "./Input";
import propTypes from "prop-types";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import LoadingOrError from "../loading_and_errors/LoadingOrError";
import fetchOptions from "../../utils/fetchOptions";

function EditEmailForm({ setShouldShowFormFn }) {
  const [newEmail, setNewEmail] = useState("");
  const { updateUser, currentUser } = useContext(userContext);
  const { performFetch, isLoading, error, cancelFetch } = useFetch(
    "/users/changeEmail",
    res => {
      updateUser(res.result);
      setNewEmail("");
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
      newEmail,
    };
    performFetch(fetchOptions("PUT", reqBody));
  }

  return (
    <Form formHeader="Edit email" formWidth="100%" onSubmit={handleSubmit}>
      <LoadingOrError
        isLoading={isLoading}
        errMsg={error}
        isErr={error ? true : false}
      />
      <Input
        isRequired={false}
        placeholder="example@email.com"
        value={newEmail}
        setValue={setNewEmail}
      />
      <PrimaryButton text="Save" width="150px" />
    </Form>
  );
}

EditEmailForm.propTypes = {
  setShouldShowFormFn: propTypes.func,
};
export default EditEmailForm;
