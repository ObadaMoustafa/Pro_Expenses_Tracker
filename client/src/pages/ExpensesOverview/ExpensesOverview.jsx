import React, { useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import { subDays, format } from "date-fns";
import useFetch from "../../hooks/useFetch";

function ExpensesOverview() {
  //write code here
  const [fromDate, setFromDate] = useState(
    format(subDays(new Date(), 30), "yyyy-MM-dd")
  );
  const [toDate, setToDate] = useState(format(new Date(), "yyyy-MM-dd"));
  // const { isLoading, error } = useFetch();

  // useEffect(() => {
  //   performFetch();
  //   return () => cancelFetch();
  // }, []);
  return (
    <>
      <Form text="submit" width="150px" formWidth="100%">
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

      <div className="overview-total-balance">
        <p>Balance</p>
        <p>550 €</p>
      </div>
      <div className="overview-total-income">
        <p>Income</p>
        <p>550 €</p>
      </div>
      <div className="overview-total-expenses">
        <p>Expenses</p>
        <p>550 €</p>
      </div>
      <div className="overview-total-debts">
        <p>Debts</p>
        <p>550 €</p>
      </div>
    </>
  );
}

ExpensesOverview.propTypes = {};
export default ExpensesOverview;
