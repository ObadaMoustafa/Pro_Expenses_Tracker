import React, { createContext, useState } from "react";
export const debtsContext = createContext();
export const DebtsProvider = ({ children }) => {
  const [userDebts, setUserDebts] = useState([]);
  const [debtsTransactions, setDebtsTransactions] = useState([]);
  const [forFilterDebtsTransactions, setForFilterDebtsTransactions] = useState(
    []
  );

  const sharedValues = {
    userDebts,
    setUserDebts,
    debtsTransactions,
    setDebtsTransactions,
    forFilterDebtsTransactions,
    setForFilterDebtsTransactions,
  };
  return (
    <debtsContext.Provider value={sharedValues}>
      {children}
    </debtsContext.Provider>
  );
};
