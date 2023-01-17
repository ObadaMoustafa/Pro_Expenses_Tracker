import { format, addDays } from "date-fns";
import React, { useContext, useState } from "react";
import { debtsContext } from "../../context/debtsContext";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import fetchOptions from "../../utils/fetchOptions";
import PrimaryButton from "../buttons/PrimaryButton";
import LoadingOrError from "../loading_and_errors/LoadingOrError";
import Form from "./Form";
import Input from "./Input";

function CreateDebtForm() {
  //write code here
  const { currentUser } = useContext(userContext);
  const { setUserDebts } = useContext(debtsContext);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [amount, setAmount] = useState("");
  const [deadLineDate, setDeadLineDate] = useState(
    format(addDays(new Date(), 30), "yyyy-MM-dd")
  );

  const { isLoading, error, performFetch } = useFetch(
    `/debts/createNewDebt/${currentUser._id}`,
    res => {
      setUserDebts(res.result);
      clearFields();
    }
  );

  function clearFields() {
    setTitle("");
    setStartDate(format(new Date(), "yyyy-MM-dd"));
    setAmount("");
    setDeadLineDate(format(addDays(new Date(), 30), "yyyy-MM-dd"));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const reqBody = {
      title,
      startDate,
      amount,
      deadLineDate,
    };

    performFetch(fetchOptions("POST", reqBody));
  }
  return (
    <>
      <LoadingOrError
        isLoading={isLoading}
        isErr={error ? true : false}
        errMsg={error}
      />
      <Form formHeader="Create new debt" onSubmit={handleSubmit}>
        <Input
          label="Title"
          placeholder="e.g. Borrowed From X to Buy Y"
          value={title}
          setValue={setTitle}
        />
        <Input
          label="Date of start"
          type="date"
          value={startDate}
          setValue={setStartDate}
          max={format(new Date(), "yyyy-MM-dd")}
        />
        <Input
          label="Amount"
          type="number"
          placeholder="Total debt amount e.g. 2000"
          value={amount}
          setValue={setAmount}
        />
        <Input
          label="Deadline Date"
          type="date"
          value={deadLineDate}
          setValue={setDeadLineDate}
          min={startDate}
        />
        <PrimaryButton text="Create" width="50%" />
      </Form>
    </>
  );
}

export default CreateDebtForm;
