import React from "react";
import ShowAllTransactions from "../../components/show_transactions/ShowAllTransactions";

function ShowAllExpenses() {
  //write code here

  return (
    <ShowAllTransactions
      type="expenses"
      headerTitle="Total Expenses without paid debts"
    />
  );
}

export default ShowAllExpenses;
