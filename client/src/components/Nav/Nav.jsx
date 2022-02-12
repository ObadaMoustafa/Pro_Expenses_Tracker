import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../context/userContext";
import wallet from "../../images/wallet.png";
import UserAvatar from "./UserAvatar";
function Nav() {
  //write code here
  const { currentUser } = useContext(userContext);
  return (
    <nav>
      <Link to={`/start/${currentUser._id}`} className="nav-logo">
        <div className="nav-logo-img">
          <img src={wallet} alt="wallet" />
        </div>
        <p className="nav-logo-txt">Pro Expenses tracker</p>
      </Link>
      <UserAvatar />
    </nav>
  );
}

export default Nav;
