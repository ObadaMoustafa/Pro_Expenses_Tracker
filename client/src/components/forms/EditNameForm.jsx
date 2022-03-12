import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import fetchOptions from "../../utils/fetchOptions";
import PrimaryButton from "../buttons/PrimaryButton";
import LoadingOrError from "../loading_and_errors/LoadingOrError";
import Form from "./Form";
import Input from "./Input";
import propTypes from "prop-types";

function EditNameForm({ shouldShowFormFn }) {
  const [fullName, setFullName] = useState("");
  const { updateUser, currentUser } = useContext(userContext);
  const { performFetch, isLoading, error, cancelFetch } = useFetch(
    "/users/changeName",
    res => {
      updateUser(res.result);
      setFullName("");
      shouldShowFormFn(false);
    }
  );

  //cleanup the fetch request
  useEffect(() => {
    return () => cancelFetch();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const reqBody = {
      userId: currentUser._id,
      newName: fullName,
    };
    performFetch(fetchOptions("PUT", reqBody));
  }
  return (
    <Form formHeader="Edit name" formWidth="100%" onSubmit={handleSubmit}>
      <LoadingOrError
        isLoading={isLoading}
        errMsg={error}
        isErr={error ? true : false}
      />
      <Input
        isRequired={false}
        placeholder="Write full name"
        value={fullName}
        setValue={setFullName}
      />
      <PrimaryButton text="Edit" width="150px" />
    </Form>
  );
}
EditNameForm.propTypes = {
  shouldShowFormFn: propTypes.func,
};
export default EditNameForm;
