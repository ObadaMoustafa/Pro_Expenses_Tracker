import React, { useEffect, useState } from "react";

function DebtCardDetails({ debtObject, currency }) {
  //write code here
  const { title, amount, hasPaid, payHistory, startDate, deadLineDate } =
    debtObject;
  const [totalPaid, setTotalPaid] = useState(0);

  const amountNeedToPay = amount - totalPaid;

  // icon for paid and still need to paid logo (right and wrong);
  const icon = hasPaid ? (
    <i
      className="fas fa-check-circle"
      style={{ color: "green" }}
      title="Debt has been paid successfully"
    ></i>
  ) : (
    <i
      className="fas fa-times-circle"
      style={{ color: "red" }}
      title="Debt hasn't been paid yet"
    ></i>
  );

  useEffect(() => {
    if (payHistory.length > 0) {
      setTotalPaid(
        payHistory
          .map((transaction) => transaction.amount)
          .reduce((a, b) => a + b)
      );
    } else {
      setTotalPaid(0);
    }
  }, [payHistory]);
  return (
    <>
      <details className="debt-card-header-title">
        <summary>
          {title.substring(0, 15)}... {icon} <br />
          {amountNeedToPay > 0 && (
            <>
              <span style={{ color: "green" }}>
                {totalPaid} {currency} Paid
              </span>{" "}
              <br />
              <span>
                {amountNeedToPay} {currency} Not Paid
              </span>
            </>
          )}
        </summary>
        <table>
          <tbody>
            <tr>
              <td>Debt title:</td>
              <td>{title}</td>
            </tr>
            <tr>
              <td>Start date</td>
              <td>{startDate}</td>
            </tr>
            <tr>
              <td>Debt amount</td>
              <td>
                {amount} {currency}
              </td>
            </tr>
            <tr>
              <td>Deadline date</td>
              <td>{deadLineDate}</td>
            </tr>
          </tbody>
        </table>
      </details>
    </>
  );
}

DebtCardDetails.propTypes = {};
export default DebtCardDetails;
