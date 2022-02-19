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
import { format } from "date-fns";

function AddExpensesForm({ type }) {
  //write code here
  const { setUserExpenses, setExpensesArray, setIncomeArray } =
    useContext(expensesContext);
  const { currentUser } = useContext(userContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const apiUrl =
    type === "expenses" ? "expenses/addExpenses" : "expenses/addIncome";
  const { isLoading, error, performFetch } = useFetch(
    `/${apiUrl}/${currentUser._id}`,
    async (res) => {
      clearFields();
      await setUserExpenses(res.result);

      // for adding the new transaction in the filtration mode.
      if (type === "expenses")
        setExpensesArray((prev) => [
          ...prev,
          { title, date, amount: Number(amount), _id: res._id },
        ]);
      if (type === "income")
        setIncomeArray((prev) => [
          ...prev,
          { title, date, amount: Number(amount), _id: res._id },
        ]);

      //TODO still need paid debts transactions
    }
  );

  // to stop Propagation when clicking anywhere in the form to prevent it to be hidden;

  function clearFields() {
    setTitle("");
    setAmount("");
    setDate(format(new Date(), "yyyy-MM-dd"));
  }

  function addExpenses(e) {
    e.preventDefault();
    const reqBody = {
      title,
      date,
      amount,
    };

    performFetch(fetchOptions("PUT", reqBody));
  }
  return (
    <>
      <Form
        onSubmit={addExpenses}
        formHeader={type === "expenses" ? "Add Expenses" : "Add Income"}
      >
        <Input
          label="Title"
          name="title"
          placeholder={`e.g. ${type === "expenses" ? "Grocery" : "Salary"}`}
          value={title}
          setValue={setTitle}
          maxLength="12"
        />
        <Input
          label="Date"
          name="date"
          type="date"
          value={date}
          setValue={setDate}
        />
        <Input
          type="number"
          label="Amount"
          name="amount"
          placeholder="between 0.1 to 9999999"
          value={amount}
          setValue={setAmount}
          max="9999999"
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

AddExpensesForm.propTypes = {
  type: PropTypes.oneOf(["expenses", "income"]).isRequired,
};
export default AddExpensesForm;
