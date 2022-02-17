import React, { useContext, useEffect, useState } from "react";
import { expensesContext } from "../../context/expensesContext";
import { resultByDateRange } from "../../utils/expensesCalculation";
import PrimaryButton from "../buttons/PrimaryButton";
import Form from "./Form";
import Input from "./Input";
import SplitFields from "./SplitFields";

function FilterByDateForm() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { userExpenses, setExpensesArray, setIncomeArray, setDebtsArray } =
    useContext(expensesContext);

  useEffect(() => {
    if (fromDate.length > 0 && toDate.length > 0) {
      const { expenses, income, debts } = userExpenses;
      console.log("userExpenses before filter", userExpenses);
      if (expenses.length > 0) {
        const filteredExpenses = resultByDateRange(expenses, fromDate, toDate);
        setExpensesArray(filteredExpenses);
      }
      if (income.length > 0) {
        const filteredIncome = resultByDateRange(income, fromDate, toDate);
        setIncomeArray(filteredIncome);
      }
      if (debts.length > 0) {
        const filteredDebts = resultByDateRange(debts, fromDate, toDate);
        setDebtsArray(filteredDebts);
      }
      console.log("userExpenses after filter", userExpenses);
    }
  }, [fromDate, toDate]);

  return (
    <Form formWidth="100%" formHeader="Filter results by Date">
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
      </SplitFields>
    </Form>
  );
}

export default FilterByDateForm;
