import React from "react";
import wallet from "../../images/wallet.png";
import UserAvatar from "./UserAvatar";
function Nav() {
  //write code here

  return (
    <nav>
      <div className="nav-logo">
        <div className="nav-logo-img">
          <img src={wallet} alt="wallet" />
        </div>
        <p className="nav-logo-txt">Pro Expenses tracker</p>
      </div>
      <UserAvatar />
    </nav>
  );
}

export default Nav;
