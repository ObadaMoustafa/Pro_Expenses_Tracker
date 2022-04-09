import React, { useContext, useState } from "react";
import { expensesContext } from "../../context/expensesContext";
import PrimaryButton from "../buttons/PrimaryButton";
import Form from "./Form";
import Input from "./Input";
import SplitFields from "./SplitFields";
import { format, subDays } from "date-fns";
import { filterOverviewData } from "../../utils/filtrationMethods";

function FilterByDateForm() {
  const [fromDate, setFromDate] = useState(
    format(subDays(new Date(), 30), "yyyy-MM-dd")
  );
  const [toDate, setToDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const { userExpenses, updateOverviewPage } = useContext(expensesContext);

  function handleFilter(e) {
    e.preventDefault();
    // filtration method for overview page
    filterOverviewData(userExpenses, fromDate, toDate, updateOverviewPage);
  }

  return (
    <Form
      formHeader="Filter expenses by date"
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
export default FilterByDateForm;
