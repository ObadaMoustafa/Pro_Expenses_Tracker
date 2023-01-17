import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/userContext";

function ResultCard({ title, amount }) {
  //write code here
  const { currentUser } = useContext(userContext);
  const [amountInlineStyle, setAmountInlineStyle] = useState({});
  useEffect(() => {
    if (title === "Balance" || title === "Income") {
      setAmountInlineStyle({
        color: amount > 0 ? "green" : "red",
      });
    } else {
      setAmountInlineStyle({ color: amount > 0 ? "red" : "green" });
    }
    // eslint-disable-next-line
  }, [amount]);
  return (
    <div className="result-card">
      <p className="result-card-title">{title}:</p>
      <p className="result-card-amount" style={amountInlineStyle}>
        {amount.toFixed(2)} {currentUser.currency}
      </p>
    </div>
  );
}

ResultCard.propTypes = {};
export default ResultCard;
