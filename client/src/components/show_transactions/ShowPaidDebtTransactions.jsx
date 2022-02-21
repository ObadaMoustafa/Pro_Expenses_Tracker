import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { userContext } from "../../context/userContext";

function ShowPaidDebtTransactions({ debtObject }) {
  //write code here
  const { currentUser } = useContext(userContext);
  const { currency } = currentUser;
  const { _id, title, payHistory, hasPaid, amount } = debtObject;
  const icon = hasPaid ? (
    <i className="fas fa-check-circle" style={{ color: "green" }}></i>
  ) : (
    <i className="fas fa-times-circle" style={{ color: "red" }}></i>
  );

  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    if (payHistory.length > 0)
      setTotalPaid(
        payHistory
          .map((transaction) => transaction.amount)
          .reduce((a, b) => a + b)
      );
  }, [payHistory]);

  const needToPay = amount - totalPaid;
  return (
    <div className="expenses-transactions-container">
      <h3 className="debt-title">
        {title} - amount {amount} {currency} {icon} <br />
        {needToPay > 0 && (
          <span>
            {needToPay} {currency} Not Paid
          </span>
        )}
      </h3>
      {payHistory.map((payTransaction) => (
        <div className="expenses-transaction" key={payTransaction._id}>
          <div className="expenses-transaction-part1">
            <p className="expenses-transaction-part1-date">
              {payTransaction.date}
            </p>
            <p className="expenses-transaction-part1-amount">
              {payTransaction.amount} {currency}
            </p>
          </div>
          <div className="expenses-transaction-part2">
            <i className="fas fa-trash"></i>
          </div>
        </div>
      ))}
    </div>
  );
}

ShowPaidDebtTransactions.propTypes = {
  debtObject: PropTypes.object,
};
export default ShowPaidDebtTransactions;
