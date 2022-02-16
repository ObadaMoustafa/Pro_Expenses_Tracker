import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Form from "../../../components/Forms/Form";
import SplitFields from "../../../components/Forms/SplitFields";
import Input from "../../../components/Forms/Input";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { resultByDateRange } from "../../../utils/expensesCalculation";
import { expensesContext } from "../../../context/expensesContext";
import ResultCard from "./ResultCard";

function ShowOverView() {
  //write code here
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const {
    userExpenses,
    balance,
    income,
    setIncome,
    expenses,
    setExpenses,
    debts,
    setDebts,
  } = useContext(expensesContext);

  function handleSubmit(e) {
    e.preventDefault();
    const { expenses, income, debts } = userExpenses;
    if (expenses) resultByDateRange(expenses, fromDate, toDate, setExpenses);
    if (income) resultByDateRange(income, fromDate, toDate, setIncome);
    if (debts && debts.length > 0)
      resultByDateRange(debts, fromDate, toDate, setDebts);
  }

  return (
    <>
      <Form
        text="submit"
        width="150px"
        formWidth="100%"
        onSubmit={handleSubmit}
      >
        <SplitFields>
          <Input
            type="date"
            label="From Date"
            value={fromDate}
            setValue={setFromDate}
            width="30%"
          />
          <Input
            type="date"
            label="To Date"
            value={toDate}
            setValue={setToDate}
            width="30%"
          />
          <PrimaryButton
            text="Filter"
            width="150px"
            icon="fa-solid fa-filter-circle-dollar"
          />
        </SplitFields>
      </Form>

      <ResultCard title="Balance" amount={balance} />
      <ResultCard title="Income" amount={income} />
      <ResultCard title="Expenses" amount={expenses} />
      <ResultCard title="Paid Debts" amount={debts} />
    </>
  );
}

ShowOverView.propTypes = {};
export default ShowOverView;
