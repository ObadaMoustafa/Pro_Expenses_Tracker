import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userContext } from "../../context/userContext";

function ShowPaidDebtTransactions({ debtObject }) {
  //write code here
  const { currentUser } = useContext(userContext);
  const { _id, title, payHistory, hasPaid, amount } = debtObject;
  const icon = hasPaid ? (
    <i className="fas fa-check-circle" style={{ color: "green" }}></i>
  ) : (
    <i className="fas fa-times-circle" style={{ color: "red" }}></i>
  );
  return (
    <>
      {payHistory.length > 0 && (
        <>
          <h3>
            {title} <br /> amount {amount}
            {currentUser.currency} {icon}
          </h3>
          {payHistory.map((payTransaction) => (
            <div className="expenses-transaction" key={payTransaction._id}>
              <div className="expenses-transaction-part1">
                <p className="expenses-transaction-part1-date">
                  {payTransaction.date}
                </p>
                <p className="expenses-transaction-part1-amount">
                  {payTransaction.amount} €
                </p>
              </div>
              <div className="expenses-transaction-part2">
                <i className="fas fa-trash"></i>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

ShowPaidDebtTransactions.propTypes = {
  debtObject: PropTypes.object,
};
export default ShowPaidDebtTransactions;
