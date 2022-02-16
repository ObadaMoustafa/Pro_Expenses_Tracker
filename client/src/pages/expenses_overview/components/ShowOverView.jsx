import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Form from "../../../components/forms/Form";
import SplitFields from "../../../components/forms/SplitFields";
import Input from "../../../components/forms/Input";
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
            icon="fas fa-funnel-dollar"
          />
        </SplitFields>
      </Form>

      <div className="result-cards-container">
        <ResultCard title="Balance" amount={balance} />
        <ResultCard title="Income" amount={income} />
        <ResultCard title="Expenses" amount={expenses} />
        <ResultCard title="Paid Debts" amount={debts} />
      </div>
    </>
  );
}

ShowOverView.propTypes = {};
export default ShowOverView;
