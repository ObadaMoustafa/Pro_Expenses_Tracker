import React from "react";
import wallet from "../images/wallet.png";
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
    </nav>
  );
}

export default Nav;
