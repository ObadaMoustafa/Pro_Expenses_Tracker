import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import Input from "./Input";
import SplitFields from "./SplitFields";
import PrimaryButton from "../buttons/PrimaryButton";
import incomeCategoriesList from "../../data/income-categories";
import expensesCategories from "../../data/expenses-categories";
const expensesCategoriesList = expensesCategories.map(
  category => category.category
);

function FilterExpensesForm({ type }) {
  //write code here
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoryList =
    type === "income" ? incomeCategoriesList : expensesCategoriesList;
  useEffect(() => {
    //! should delete this use effect after testing
    console.log("selected categories", selectedCategories);
  }, [selectedCategories]);

  function handleCheckboxChange(e) {
    const { name: categoryName, checked } = e.target;
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryName]);
    } else {
      setSelectedCategories(prev =>
        prev.filter(category => category !== categoryName)
      );
    }
  }

  function handleFilter(e) {
    e.preventDefault();
  }
  return (
    <>
      <Form
        formHeader="Filter income transactions"
        formWidth="100%"
        onSubmit={handleFilter}>
        <SplitFields>
          <Input
            label="From date"
            type="date"
            value={fromDate}
            setValue={setFromDate}
            isRequired={false}
          />
          <Input
            label="To date"
            type="date"
            value={toDate}
            setValue={setToDate}
            isRequired={false}
          />
        </SplitFields>
        <p className="select-category">Select categories</p>
        <div className="category-list">
          {categoryList.map((category, index) => (
            <label htmlFor={category} key={index}>
              <input
                type="checkbox"
                name={category}
                id={category}
                value={category}
                onChange={handleCheckboxChange}
              />{" "}
              {category}
            </label>
          ))}
        </div>

        <PrimaryButton
          text="Filter"
          width="150px"
          icon="fas fa-funnel-dollar"
        />
      </Form>
    </>
  );
}

FilterExpensesForm.propTypes = {
  type: PropTypes.oneOf(["income", "expenses"]).isRequired,
};
export default FilterExpensesForm;
