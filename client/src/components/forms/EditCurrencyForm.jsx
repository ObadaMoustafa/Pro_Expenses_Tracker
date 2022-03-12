import React, { useContext, useEffect, useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Form from "./Form";
import Input from "./Input";
import propTypes from "prop-types";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import LoadingOrError from "../loading_and_errors/LoadingOrError";
import fetchOptions from "../../utils/fetchOptions";

function EditCurrencyForm({ setShouldShowFormFn }) {
  const [newCurrency, setNewCurrency] = useState("");
  const { updateUser, currentUser } = useContext(userContext);
  const { performFetch, isLoading, error, cancelFetch } = useFetch(
    "/users/changeCurrency",
    res => {
      updateUser(res.result);
      setNewCurrency("");
      setShouldShowFormFn(false);
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
      newCurrency,
    };
    performFetch(fetchOptions("PUT", reqBody));
  }
  return (
    <Form formHeader="Edit currency" formWidth="100%" onSubmit={handleSubmit}>
      <LoadingOrError
        isLoading={isLoading}
        errMsg={error}
        isErr={error ? true : false}
      />
      <Input
        isRequired={false}
        placeholder="e.g. EGP, EUR, USD"
        value={newCurrency}
        setValue={setNewCurrency}
      />
      <PrimaryButton text="Edit" width="150px" />
    </Form>
  );
}
EditCurrencyForm.propTypes = {
  setShouldShowFormFn: propTypes.func,
};
export default EditCurrencyForm;
