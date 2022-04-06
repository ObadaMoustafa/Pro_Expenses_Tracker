import React, { useContext, useState } from "react";
import { expensesContext } from "../../context/expensesContext";
import PrimaryButton from "../buttons/PrimaryButton";
import Form from "./Form";
import Input from "./Input";
import SplitFields from "./SplitFields";
import { format, subDays } from "date-fns";
import PropTypes from "prop-types";
import {
  filterOverviewData,
  filterTransactionsByRangeDates,
} from "../../utils/filtrationMethods";

function FilterByDateForm({ type }) {
  const [fromDate, setFromDate] = useState(
    format(subDays(new Date(), 30), "yyyy-MM-dd")
  );
  const [toDate, setToDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const { userExpenses, setExpensesArray, setIncomeArray, updateOverviewPage } =
    useContext(expensesContext);

  function handleFilter(e) {
    e.preventDefault();
    const { expenses, income } = userExpenses;
    // updateExpensesArrays();

    // filtration method for overview page
    if (type === "overview") {
      filterOverviewData(userExpenses, fromDate, toDate, updateOverviewPage);
    }
    //filtration method for expenses page
    else if (type === "expenses") {
      const filteredExpenses = filterTransactionsByRangeDates(
        expenses,
        fromDate,
        toDate
      );
      setExpensesArray(filteredExpenses);
    }
    //filtration method for income page
    else if (type === "income") {
      const filteredIncome = filterTransactionsByRangeDates(
        income,
        fromDate,
        toDate
      );
      setIncomeArray(filteredIncome);
    }
  }

  return (
    <Form
      formHeader="Filter results by date"
      onSubmit={handleFilter}
      formWidth="100%">
      <SplitFields>
        <Input
          type="date"
          label="From Date"
          value={fromDate}
          setValue={setFromDate}
          max={format(new Date(), "yyyy-MM-dd")}
        />
        <Input
          type="date"
          label="To Date"
          value={toDate}
          setValue={setToDate}
          max={format(new Date(), "yyyy-MM-dd")}
        />
        <PrimaryButton
          text="Filter"
          width="150px"
          icon="fas fa-funnel-dollar"
        />
      </SplitFields>
    </Form>
  );
}
FilterByDateForm.propTypes = {
  type: PropTypes.oneOf(["overview", "expenses", "income"]).isRequired,
};
export default FilterByDateForm;
