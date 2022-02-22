import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../../hooks/useFetch";
import { userContext } from "../../../context/userContext";
import { debtsContext } from "../../../context/debtsContext";
import fetchOptions from "../../../utils/fetchOptions";
import LoadingOrError from "../../../components/loading&errors/LoadingOrError";

function PayDebtTransaction({ payDebtTransaction, debtId }) {
  //write code here
  const { date, amount, _id } = payDebtTransaction;
  const { currentUser } = useContext(userContext);
  const { setUserDebts } = useContext(debtsContext);
  const { performFetch, isLoading, error, cancelFetch } = useFetch(
    `/debts/deletePaidDebtsTransaction/${currentUser._id}/`,
    (res) => {
      setUserDebts(res.result);
    }
  );
  useEffect(() => {
    return () => cancelFetch();
  }, []);
  function deleteTransaction() {
    const reqBody = {
      debtId,
      transactionId: _id,
    };

    performFetch(fetchOptions("DELETE", reqBody));
  }
  return (
    <>
      <LoadingOrError
        isLoading={isLoading}
        isErr={error ? true : false}
        errMsg={error}
      />
      <div className="debt-transaction">
        <div className="debt-transaction-part1">
          <p className="debt-transaction-part1-date">{date}</p>
          <p className="debt-transaction-part1-amount">
            {amount} {currentUser.currency}
          </p>
        </div>
        <div className="debt-transaction-part2" title="Delete Transaction">
          <i className="fas fa-trash" onClick={deleteTransaction}></i>
        </div>
      </div>
    </>
  );
}

PayDebtTransaction.propTypes = {
  payDebtTransaction: PropTypes.object,
  debtId: PropTypes.string,
};
export default PayDebtTransaction;
