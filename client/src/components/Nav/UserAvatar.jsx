import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/userContext";
import maleAvatar from "../../images/male-avatar.png";
import femaleAvatar from "../../images/female-avatar.png";
import { Link } from "react-router-dom";
function UserAvatar() {
  //write code here
  const { currentUser } = useContext(userContext);
  const isMale = currentUser.gender === "male";
  const [isMenu, setIsMenu] = useState(false);

  function showMenu() {
    setIsMenu((pre) => !pre);
  }
  return (
    <div className="dropdown-list">
      <div className="nav-user" onClick={showMenu}>
        <p className="nav-user-name">Welcome {currentUser.name}!</p>
        <div className="nav-user-avatar">
          <img src={isMale ? maleAvatar : femaleAvatar} alt="user avatar" />
        </div>
      </div>
      {isMenu && (
        <div className="dropdown-list-menu">
          <Link to="/hfhf" className="dropdown-list-menu-item">
            Expenses
          </Link>
          <Link to="/hfhf" className="dropdown-list-menu-item">
            Debts
          </Link>
          <Link to="/hfhf" className="dropdown-list-menu-item">
            Income
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
