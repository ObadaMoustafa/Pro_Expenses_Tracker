import React from "react";
import { Link } from "react-router-dom";
import wallet from "../../images/wallet.png";
import UserAvatar from "./UserAvatar";
function Nav() {
  //write code here
  return (
    <nav>
      <Link to={"/start/overview"} className="nav-logo">
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
