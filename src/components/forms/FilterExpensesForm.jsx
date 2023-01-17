import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import Input from "./Input";
import SplitFields from "./SplitFields";
import PrimaryButton from "../buttons/PrimaryButton";
import incomeCategories from "../../data/income-categories";
import expensesCategories from "../../data/expenses-categories";
import { expensesContext } from "../../context/expensesContext";
import {
  filterExpensesData,
  filterIncomeData,
} from "../../utils/filtrationMethods";
import LoadingOrError from "../loading_and_errors/LoadingOrError";
import SecondaryButton from "../buttons/SecondaryButton";
import { format } from "date-fns";

const incomeCategoriesList = incomeCategories.sort((a, b) =>
  a.localeCompare(b)
);
const expensesCategoriesList = expensesCategories
  .map((category) => category.category)
  .sort((a, b) => a.localeCompare(b));

function FilterExpensesForm({ type }) {
  //write code here
  const { setExpensesArray, setIncomeArray, userExpenses } =
    useContext(expensesContext);
  const { expenses, income } = userExpenses;
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [errorObject, setErrorObject] = useState({ isErr: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);
  const categoryList =
    type === "income" ? incomeCategoriesList : expensesCategoriesList;

  function handleCheckboxChange(e) {
    const { name: categoryName, checked } = e.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, categoryName]);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((category) => category !== categoryName)
      );
    }
  }

  function resetDates() {
    setFromDate("");
    setToDate("");
  }

  function resetData() {
    const checkboxes = document.querySelectorAll(".category-checkbox-input");
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
    setIsSelectedAll(false);
    setSelectedCategories([]);
    resetDates();
    type === "expenses" ? setExpensesArray(expenses) : setIncomeArray(income);
  }

  function selectAllCategories() {
    setIsSelectedAll((prev) => !prev);
  }

  useEffect(() => {
    const checkboxes = document.querySelectorAll(".category-checkbox-input");
    if (isSelectedAll) {
      checkboxes.forEach((checkbox) => (checkbox.checked = true));
      setSelectedCategories(categoryList);
    } else {
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
      setSelectedCategories([]);
    }
    // eslint-disable-next-line
  }, [isSelectedAll]);

  function handleFilter(e) {
    e.preventDefault();
    setErrorObject({
      isErr: false,
      msg: "",
    });
    setIsLoading(true);

    // error handling
    if (
      (type === "expenses" && expenses.length === 0) ||
      (type === "income" && income.length === 0)
    ) {
      setErrorObject({ isErr: true, msg: "No data to filter" });
      setIsLoading(false);
      return;
    }

    if (fromDate > toDate) {
      setErrorObject({
        isErr: true,
        msg: "(From date) cannot be greater than (To date)",
      });
      setIsLoading(false);
      return;
    }

    if (selectedCategories.length === 0) {
      setErrorObject({
        isErr: true,
        msg: "Please select at least one category",
      });
      setIsLoading(false);
      return;
    }

    // filter data
    if (type === "expenses") {
      const clonedExpenses = structuredClone(expenses);
      const filteredExpenses = filterExpensesData(
        clonedExpenses,
        selectedCategories,
        fromDate,
        toDate
      );
      setExpensesArray(filteredExpenses);
    } else {
      const clonedIncome = structuredClone(income);
      const filteredIncome = filterIncomeData(
        clonedIncome,
        selectedCategories,
        fromDate,
        toDate
      );
      setIncomeArray(filteredIncome);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Form
        formHeader={`Filter ${
          type === "expenses" ? "expenses" : "income"
        } transactions`}
        formWidth="100%"
        onSubmit={handleFilter}
      >
        <LoadingOrError
          isLoading={isLoading}
          isErr={errorObject.isErr}
          errMsg={errorObject.msg}
        />
        <SplitFields>
          <Input
            label="From date"
            type="date"
            value={fromDate}
            setValue={setFromDate}
            isRequired={false}
            max={format(new Date(), "yyyy-MM-dd")}
          />
          <Input
            label="To date"
            type="date"
            value={toDate}
            setValue={setToDate}
            isRequired={false}
            max={format(new Date(), "yyyy-MM-dd")}
          />
          <i
            className="fas fa-calendar-times clear-dates-icon"
            onClick={resetDates}
            title="clear dates"
          ></i>
        </SplitFields>
        <p className="select-category">Select categories</p>
        <div className="category-list">
          <label htmlFor="select-all">
            <input
              type="checkbox"
              name="select-all"
              id="select-all"
              value="select-all"
              onChange={selectAllCategories}
              className="category-checkbox-input"
            />{" "}
            Select all
          </label>
          {categoryList.map((category, index) => (
            <label htmlFor={category} key={index}>
              <input
                type="checkbox"
                name={category}
                id={category}
                value={category}
                onChange={handleCheckboxChange}
                className="category-checkbox-input"
              />{" "}
              {category}
            </label>
          ))}
        </div>
        <SplitFields>
          <PrimaryButton
            text="Filter"
            width="150px"
            icon="fas fa-funnel-dollar"
            id="filter-button"
          />
          <SecondaryButton
            text="Reset data"
            icon="fas fa-sync"
            width="150px"
            onClick={resetData}
          />
        </SplitFields>
      </Form>
    </>
  );
}

FilterExpensesForm.propTypes = {
  type: PropTypes.oneOf(["income", "expenses"]).isRequired,
};
export default FilterExpensesForm;
