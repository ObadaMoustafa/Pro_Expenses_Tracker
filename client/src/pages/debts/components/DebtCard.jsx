import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { userContext } from "../../../context/userContext";
import PayDebtTransaction from "./PayDebtTransaction";

function DebtCard({ debtObject }) {
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
    <div className="debt-card">
      <div className="debt-card-header">
        <h3 className="debt-card-header-title">
          {title} - amount {amount} {currency} {icon} <br />
          {needToPay > 0 && (
            <span>
              {needToPay} {currency} Not Paid
            </span>
          )}
        </h3>

        {/* edit and delete card icons */}
        <div className="debt-card-header-icons">
          <i className="fas fa-edit" title="Edit Debt"></i>
          <i className="fas fa-trash-alt" title="Delete Debt"></i>
        </div>

        {/* all debt transactions */}
      </div>
      {payHistory.map((payTransaction) => (
        <PayDebtTransaction
          payDebtTransaction={payTransaction}
          debtId={_id}
          key={payTransaction._id}
        />
      ))}
    </div>
  );
}

DebtCard.propTypes = {
  debtObject: PropTypes.object,
};
export default DebtCard;
