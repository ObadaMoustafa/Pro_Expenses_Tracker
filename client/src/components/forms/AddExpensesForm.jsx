import React, { useContext, useState, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import Input from "./Input";
import { expensesContext } from "../../context/expensesContext";
import { userContext } from "../../context/userContext";
import { format } from "date-fns";
import useFetch from "../../hooks/useFetch";
import fetchOptions from "../../utils/fetchOptions";
import PrimaryButton from "../buttons/PrimaryButton";
import expensesCategories from "../../data/expenses-categories.json";
import incomeCategories from "../../data/income-categories.json";
import SelectInput from "./SelectInput";
import LoadingOrError from "../loading_and_errors/LoadingOrError";

//put all categories for json file an array
const expensesCategoriesOnly = expensesCategories.map(
  expensesCategory => expensesCategory.category
);

// for useReducer
const initialState = [];
const reducer = (state, action) => {
  if (action.payload !== "none") {
    switch (action.type) {
      case "expenses":
        return expensesCategories.find(
          expensesCategory => expensesCategory.category === action.payload
        ).subcategories;
      default:
        return state;
    }
  }
};
function AddExpensesForm({ type }) {
  //write code here
  const { setUserExpenses, setExpensesArray, setIncomeArray } =
    useContext(expensesContext);
  const { currentUser } = useContext(userContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [category, setCategory] = useState("none");
  const [subcategory, setSubcategory] = useState("none");
  // this is to set the subcategories list for select input.
  const [subcategories, dispatch] = useReducer(reducer, initialState);

  const apiUrl =
    type === "expenses" ? "expenses/addExpenses" : "expenses/addIncome";
  const { isLoading, error, performFetch } = useFetch(
    `/${apiUrl}/${currentUser._id}`,
    res => {
      clearFields();
      const { expenses, income, paidDebts } = res.result;
      setUserExpenses({ expenses, income, paidDebts });

      // TODO for adding the new transaction in the filtration mode.
      // if (type === "expenses") setExpensesArray(expenses);
      // if (type === "income") setIncomeArray(income);
    }
  );

  // dispatch when the user select the category to show subcategories list in select input.
  useEffect(() => {
    dispatch({ type: type, payload: category });
  }, [category]);

  function clearFields() {
    setSubcategory("none");
    setCategory("none");
    setTitle("");
    setAmount("");
    setDate(format(new Date(), "yyyy-MM-dd"));
  }

  function addExpenses(e) {
    e.preventDefault();
    let reqBody;
    if (type === "expenses") {
      reqBody = { title, date, amount, category, subcategory };
    } else {
      reqBody = { title, date, amount, category };
    }

    performFetch(fetchOptions("PUT", reqBody));
  }

  return (
    <>
      <Form
        onSubmit={addExpenses}
        formHeader={type === "expenses" ? "Add Expenses" : "Add Income"}>
        <LoadingOrError
          isLoading={isLoading}
          isErr={error ? true : false}
          errMsg={error}
        />
        <SelectInput
          label="Category"
          options={
            type === "expenses" ? expensesCategoriesOnly : incomeCategories
          }
          value={category}
          setValue={setCategory}
        />
        {type === "expenses" && (
          <SelectInput
            label="subcategory"
            options={subcategories}
            value={subcategory}
            setValue={setSubcategory}
          />
        )}
        <Input
          label="Title"
          name="title"
          placeholder={`e.g. ${
            type === "expenses" ? "Supermarket name" : "Company name"
          }`}
          value={title}
          setValue={setTitle}
          maxLength="30"
        />
        <Input
          label="Date"
          name="date"
          type="date"
          value={date}
          setValue={setDate}
          max={format(new Date(), "yyyy-MM-dd")}
        />

        <Input
          type="number"
          label="Amount"
          name="amount"
          placeholder="between 0.1 to 9999999"
          value={amount}
          setValue={setAmount}
          max="9999999"
          step="0.01"
        />
        <PrimaryButton text="Add" width="50%" />
      </Form>
    </>
  );
}

AddExpensesForm.propTypes = {
  type: PropTypes.oneOf(["expenses", "income"]).isRequired,
};
export default AddExpensesForm;
