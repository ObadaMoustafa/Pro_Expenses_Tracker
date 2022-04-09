import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { debtsContext } from "../../context/debtsContext";
import { expensesContext } from "../../context/expensesContext";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import fetchOptions from "../../utils/fetchOptions";
import PrimaryButton from "../buttons/PrimaryButton";
import LoadingOrError from "../loading_and_errors/LoadingOrError";
import Form from "./Form";
import Input from "./Input";
import SelectInput from "./SelectInput";

function PayDebtsForm() {
  //write code here
  const { currentUser } = useContext(userContext);
  const { setUserExpenses, setPaidDebtsTransactions } =
    useContext(expensesContext);
  const { setUserDebts, setForFilterDebtsTransactions, needToPay } =
    useContext(debtsContext);

  const [debtId, setDebtId] = useState("none");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [amount, setAmount] = useState("");

  const apiUri = `/debts/payDebt/${currentUser._id}/${debtId}`;
  const { performFetch, isLoading, error } = useFetch(apiUri, res => {
    const { expenses, income, paidDebts, userDebts } = res.result;

    setUserExpenses({ expenses, income, paidDebts });
    setUserDebts(userDebts);
    setForFilterDebtsTransactions(res.allTransactions);
    clearFields();

    // this line for overview page so we don't care a bout _id;
    setPaidDebtsTransactions(paidDebts);
  });

  function clearFields() {
    setDebtId("none");
    setDate(format(new Date(), "yyyy-MM-dd"));
    setAmount("");
  }

  function handlePayDebt(e) {
    e.preventDefault();
    const reqBody = {
      date,
      amount,
    };
    performFetch(fetchOptions("PUT", reqBody));
  }
  return (
    <>
      <LoadingOrError
        isLoading={isLoading}
        isErr={error ? true : false}
        errMsg={error}
      />
      <Form formHeader="Pay debt" onSubmit={handlePayDebt}>
        {needToPay.length > 0 ? (
          <>
            <SelectInput
              options={needToPay}
              label="Select debt"
              value={debtId}
              setValue={setDebtId}
            />
            <Input
              label="Date"
              type="date"
              value={date}
              setValue={setDate}
              max={format(new Date(), "yyyy-MM-dd")}
            />
            <Input
              label="Amount"
              type="number"
              step="0.01"
              value={amount}
              setValue={setAmount}
              placeholder="Total shouldn't be more than the debt amount"
            />
            <PrimaryButton text="submit" width="50%" />
          </>
        ) : (
          <p>You should add debts first to be able to pay for it</p>
        )}
      </Form>
    </>
  );
}

export default PayDebtsForm;
