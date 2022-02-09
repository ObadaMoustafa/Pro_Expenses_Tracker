import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const userContext = createContext();
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  function updateUser(infoToUpdate) {
    setCurrentUser(infoToUpdate);
    localStorage.setItem("user", JSON.stringify(infoToUpdate));
  }

  function logout() {
    setCurrentUser(null);
    localStorage.setItem("user", null);
  }

  const sharedValues = {
    currentUser,
    updateUser,
    logout,
  };

  return (
    <userContext.Provider value={sharedValues}>{children}</userContext.Provider>
  );
};

UserProvider.protoTypes = {
  children: PropTypes.array,
};
