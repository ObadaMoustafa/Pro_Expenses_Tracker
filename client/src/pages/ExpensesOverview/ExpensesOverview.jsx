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
import SplitFields from "../../components/Form/SplitFields";
import PrimaryButton from "../../components/buttons/PrimaryButton";

function ExpensesOverview() {
  //will use new user to show or redirect to add expenses page if there is no records for user
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
      const { expenses, income, debts } = res.result;
      if (expenses || income || debts) {
        console.log("expenses:", expenses);
        console.log("income:", income);
        console.log("debts:", debts);
        setIsNewUser(false);
        setUserExpenses(res.result);
        if (expenses) setExpenses(sumArrayValues(expenses));
        if (income) setIncome(sumArrayValues(income));
        if (debts) setDebts(sumArrayValues(debts));
      } else {
        setIsNewUser(true);
      }
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    const { expenses, income, debts } = userExpenses;
    if (expenses) resultByDateRange(expenses, fromDate, toDate, setExpenses);
    if (income) resultByDateRange(income, fromDate, toDate, setIncome);
    if (debts && debts.length > 0)
      resultByDateRange(debts, fromDate, toDate, setDebts);
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
      {isNewUser ? (
        <div>You still a new user</div>
      ) : (
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
          <LoadingOrError
            isLoading={isLoading}
            isErr={error ? true : false}
            errMsg={error}
          />
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
      )}
    </>
  );
}

ExpensesOverview.propTypes = {};
export default ExpensesOverview;
