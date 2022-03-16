import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/userContext";
import maleAvatar from "../../images/male-avatar.png";
import femaleAvatar from "../../images/female-avatar.png";
import { NavLink } from "react-router-dom";
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
        {isMenuShow ? (
          <i className="fas fa-times-circle nav-user-menu-icon"></i>
        ) : (
          <i className="fas fa-bars nav-user-menu-icon"></i>
        )}
      </div>
      <div className={`dropdown-list-menu ${menuClass}`}>
        <NavLink to="profile" className="dropdown-list-menu-item">
          Profile
        </NavLink>
        <NavLink to="overview" className="dropdown-list-menu-item">
          Balance Overview
        </NavLink>
        <NavLink to="show_all_expenses" className="dropdown-list-menu-item">
          Expenses
        </NavLink>
        <NavLink to="show_all_income" className="dropdown-list-menu-item">
          Income
        </NavLink>
        <NavLink to="debts" className="dropdown-list-menu-item">
          Debts
        </NavLink>
        <div className="dropdown-list-menu-item" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default UserAvatar;
