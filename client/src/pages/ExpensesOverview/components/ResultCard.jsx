import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ResultCard({ title, amount }) {
  //write code here
  const [amountInlineStyle, setAmountInlineStyle] = useState({});
  const [titleInlineStyle, setTitleInlineStyle] = useState({});
  useEffect(() => {
    if (title === "Balance") {
      setAmountInlineStyle({
        color: amount > 0 ? "green" : "red",
        fontSize: "3rem",
      });
      setTitleInlineStyle({ fontSize: "3rem" });
    } else if (title === "Income") {
      setAmountInlineStyle({ color: amount > 0 ? "green" : "red" });
    } else {
      setAmountInlineStyle({ color: amount > 0 ? "red" : "green" });
    }
  }, [amount]);
  return (
    <>
      <div className="result-card">
        <p className="result-card-title" style={titleInlineStyle}>
          {title}:
        </p>
        <p className="result-card-amount" style={amountInlineStyle}>
          {amount} €
        </p>
      </div>
    </>
  );
}

ResultCard.propTypes = {};
export default ResultCard;
