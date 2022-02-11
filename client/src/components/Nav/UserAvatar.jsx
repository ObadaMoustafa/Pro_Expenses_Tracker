import React, { useContext } from "react";
import { userContext } from "../../context/userContext";
import maleAvatar from "../../images/male-avatar.png";
import femaleAvatar from "../../images/female-avatar.png";
function UserAvatar() {
  //write code here
  const { currentUser } = useContext(userContext);
  const isMale = currentUser.gender === "male";

  return (
    <div className="nav-user">
      <p className="nav-user-name">Welcome {currentUser.name}!</p>
      <div className="nav-user-avatar">
        <img src={isMale ? maleAvatar : femaleAvatar} alt="user avatar" />
      </div>
    </div>
  );
}

export default UserAvatar;
