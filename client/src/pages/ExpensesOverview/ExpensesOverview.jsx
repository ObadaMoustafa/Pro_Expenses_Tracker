import React, { useContext, useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import { subDays, format } from "date-fns";
import useFetch from "../../hooks/useFetch";
import { userContext } from "../../context/userContext";
import {
  resultByDateRange,
  sumArrayValues,
} from "../../utils/expensesCalculation";
import LoadingOrError from "../../components/loading&errors/LoadingOrError";

function ExpensesOverview() {
  //write code here
  const [isNewUser, setIsNewUser] = useState(true);
  const { currentUser } = useContext(userContext);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userExpenses, setUserExpenses] = useState(null);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [debts, setDebts] = useState(0);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/expenses/getExpenses/${currentUser._id}`,
    async (res) => {
      if (res.result) {
        setIsNewUser(false);
        setUserExpenses(res.result);
        const { expenses, income, debts } = res.result;
        if (expenses) setExpenses(sumArrayValues(expenses));
        if (income) setIncome(sumArrayValues(income));
        if (debts) setDebts(sumArrayValues(debts));
      }
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    const { expenses, income, debts } = userExpenses;
    if (expenses) resultByDateRange(expenses, fromDate, toDate, setExpenses);
    if (income) resultByDateRange(income, fromDate, toDate, setIncome);
    if (debts) resultByDateRange(debts, fromDate, toDate, setDebts);
  }

  // calculating the balance to be dynamic with transactions;
  useEffect(() => {
    const totalBalance = income - expenses - debts;
    setBalance(totalBalance);
  }, [income, expenses, debts]);

  // performing the first fetch for total user history
  useEffect(() => {
    performFetch();
    return () => cancelFetch();
  }, []);
  return (
    <>
      <Form
        text="submit"
        width="150px"
        formWidth="100%"
        onSubmit={handleSubmit}
      >
        <Input
          type="date"
          label="From Date"
          value={fromDate}
          setValue={setFromDate}
        />
        <Input
          type="date"
          label="To Date"
          value={toDate}
          setValue={setToDate}
        />
      </Form>
      <LoadingOrError isLoading={isLoading} isErr={error} errMsg={error} />
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

ExpensesOverview.propTypes = {};
export default ExpensesOverview;
