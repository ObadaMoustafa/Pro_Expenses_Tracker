import React, { createContext, useEffect, useState } from "react";
export const debtsContext = createContext();
export const DebtsProvider = ({ children }) => {
  const [userDebts, setUserDebts] = useState([]);
  const [debtsTransactions, setDebtsTransactions] = useState([]);
  const [forFilterDebtsTransactions, setForFilterDebtsTransactions] = useState(
    []
  );
  const [needToPay, setNeedToPay] = useState([]);

  useEffect(() => {
    if (userDebts.length > 0) {
      setUserDebts((prev) => prev.sort((a, b) => a.hasPaid - b.hasPaid));
      setNeedToPay(userDebts.filter((debt) => debt.hasPaid === false));
    }
  }, [userDebts]);
  const sharedValues = {
    userDebts,
    setUserDebts,
    debtsTransactions,
    setDebtsTransactions,
    forFilterDebtsTransactions,
    setForFilterDebtsTransactions,
    needToPay,
    setNeedToPay,
  };
  return (
    <debtsContext.Provider value={sharedValues}>
      {children}
    </debtsContext.Provider>
  );
};
