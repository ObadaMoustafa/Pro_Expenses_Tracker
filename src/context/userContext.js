import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const userContext = createContext();
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
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
    navigate("/");
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
