import React, { useContext } from "react";
import { userContext } from "../../context/userContext";
import RoundButton from "../buttons/RoundButton";

function AddExpenses({ header, onClick }) {
  //write code here
  const { currentUser } = useContext(userContext);
  //   const {} = useFetch();

  return (
    <>
      <div className="add-expenses-button">
        <p className="add-expenses-button-header">{header}</p>
        <div className="add-expenses-button-button">
          <RoundButton text="+" onClick={onClick} />
        </div>
      </div>
    </>
  );
}

export default AddExpenses;
