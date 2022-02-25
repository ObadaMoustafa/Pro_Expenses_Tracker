import React, { useContext, useEffect, useState } from "react";
import { debtsContext } from "../../context/debtsContext";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import fetchOptions from "../../utils/fetchOptions";
import PrimaryButton from "../buttons/PrimaryButton";
import LoadingOrError from "../loading&errors/LoadingOrError";
import Form from "./Form";
import Input from "./Input";

function EditDebtDetailsForm({ setHideForm, debtObject }) {
  //write code here
  const { currentUser } = useContext(userContext);
  const { setUserDebts } = useContext(debtsContext);
  const [title, setTitle] = useState(debtObject.title);
  const [startDate, setStartDate] = useState(debtObject.startDate);
  const [amount, setAmount] = useState(debtObject.amount.toString());
  const [deadLineDate, setDeadLineDate] = useState(debtObject.deadLineDate);

  const { performFetch, isLoading, error, cancelFetch } = useFetch(
    `/debts/editDebtDetails/${currentUser._id}/${debtObject._id}/`,
    async (res) => {
      await setUserDebts(res.result);
      hideForm();
    }
  );

  function saveEdits(e) {
    e.preventDefault();
    const reqBody = {
      title,
      startDate,
      amount,
      deadLineDate,
    };
    performFetch(fetchOptions("PUT", reqBody));
  }

  useEffect(() => {
    return () => cancelFetch();
  }, []);

  function hideForm() {
    setHideForm(false);
  }

  return (
    <div className="popup-form-bg">
      <div className="popup-form">
        <Form formHeader="Edit debt details" onSubmit={saveEdits}>
          <LoadingOrError
            isLoading={isLoading}
            isErr={error ? true : false}
            errMsg={error}
          />
          <Input label="title" value={title} setValue={setTitle} />
          <Input
            label="Start date"
            type="date"
            value={startDate}
            setValue={setStartDate}
          />
          <Input
            label="Amount"
            type="number"
            value={amount}
            setValue={setAmount}
          />
          <Input
            label="Deadline date"
            type="date"
            value={deadLineDate}
            setValue={setDeadLineDate}
          />
          <PrimaryButton text="Save" width="150px" />
          <button onClick={hideForm} className="close-form-btn" type="button">
            X
          </button>
        </Form>
      </div>
    </div>
  );
}

export default EditDebtDetailsForm;
