import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/userContext";
import maleAvatar from "../../images/male-avatar.png";
import femaleAvatar from "../../images/female-avatar.png";
import { Link } from "react-router-dom";
function UserAvatar() {
  //write code here
  const { currentUser, logout } = useContext(userContext);
  const isMale = currentUser.gender === "male";
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [menuClass, setMenuClass] = useState("hide-menu");

  useEffect(() => {
    if (isMenuShow) window.addEventListener("click", showMenu);

    return () => window.removeEventListener("click", showMenu);
  }, [isMenuShow]);

  function showMenu() {
    if (!isMenuShow) {
      setMenuClass("show-menu");
      setIsMenuShow(true);
    } else {
      setMenuClass("hide-menu");
      setIsMenuShow(false);
    }
  }

  return (
    <div className="dropdown-list">
      <div className="nav-user" onClick={showMenu}>
        <p className="nav-user-name">Welcome {currentUser.name}!</p>
        <div className="nav-user-avatar">
          <img src={isMale ? maleAvatar : femaleAvatar} alt="user avatar" />
        </div>
      </div>
      <div className={`dropdown-list-menu ${menuClass}`}>
        <Link to="/hfhf" className="dropdown-list-menu-item">
          Expenses
        </Link>
        <Link to="/hfhf" className="dropdown-list-menu-item">
          Debts
        </Link>
        <div className="dropdown-list-menu-item" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default UserAvatar;
