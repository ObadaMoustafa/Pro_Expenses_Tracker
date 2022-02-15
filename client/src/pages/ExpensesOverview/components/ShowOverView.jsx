import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Form from "../../../components/Form/Form";
import SplitFields from "../../../components/Form/SplitFields";
import Input from "../../../components/Form/Input";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { resultByDateRange } from "../../../utils/expensesCalculation";
import { expensesContext } from "../../../context/expensesContext";

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
          <PrimaryButton text="Submit" width="150px" />
        </SplitFields>
      </Form>

      <div className="overview-total-balance">
        <p>Balance</p>
        <p style={{ color: balance > 0 ? "green" : "red" }}>{balance} €</p>
      </div>
      <div className="overview-total-income">
        <p>Income</p>
        <p>{income} €</p>
      </div>
      <div className="overview-total-expenses">
        <p>Expenses</p>
        <p>{expenses} €</p>
      </div>
      <div className="overview-total-debts">
        <p>Paid Debts</p>
        <p>{debts} €</p>
      </div>
    </>
  );
}

ShowOverView.propTypes = {};
export default ShowOverView;
