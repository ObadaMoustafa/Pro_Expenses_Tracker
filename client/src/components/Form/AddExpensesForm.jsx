import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import Input from "./Input";
import { expensesContext } from "../../context/expensesContext";
import useFetch from "../../hooks/useFetch";
import { userContext } from "../../context/userContext";
import PrimaryButton from "../buttons/PrimaryButton";
import fetchOptions from "../../utils/fetchOptions";
import LoadingOrError from "../loading&errors/LoadingOrError";

function AddExpensesForm() {
  //write code here
  const { setUserExpenses } = useContext(expensesContext);
  const { currentUser } = useContext(userContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("0");
  const [date, setDate] = useState("");
  const { isLoading, error, performFetch } = useFetch(
    `/expenses/addExpenses/${currentUser._id}`,
    async (res) => await setUserExpenses(res.result)
  );

  function addExpenses() {
    const reqBody = {
      title,
      date,
      amount,
    };

    performFetch(fetchOptions("PUT", reqBody));
  }
  return (
    <>
      <Form onSubmit={addExpenses}>
        <Input label="Title" name="title" value={title} setValue={setTitle} />
        <Input
          label="Date"
          name="date"
          type="date"
          value={date}
          setValue={setDate}
        />
        <Input
          label="Amount"
          name="amount"
          value={amount}
          setValue={setAmount}
        />
        <PrimaryButton text="Add" width="50%" />
      </Form>
      <LoadingOrError
        isLoading={isLoading}
        isErr={error ? true : false}
        errMsg={error}
      />
    </>
  );
}

AddExpensesForm.propTypes = {};
export default AddExpensesForm;
