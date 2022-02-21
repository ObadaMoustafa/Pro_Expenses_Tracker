import React from "react";
import PropTypes from "prop-types";

function ShowPaidDebtTransactions() {
  //write code here

  return (
    <>
      <h3>Debt title</h3>
      <div className="expenses-transaction">
        <div className="expenses-transaction-part1">
          <p className="expenses-transaction-part1-title">{title}</p>
          <p className="expenses-transaction-part1-date">{date}</p>
          <p className="expenses-transaction-part1-amount">{amount} €</p>
        </div>
        <div className="expenses-transaction-part2">
          <i className="fas fa-trash" onClick={deleteTransaction}></i>
        </div>
      </div>
    </>
  );
}

ShowPaidDebtTransactions.propTypes = {};
export default ShowPaidDebtTransactions;
