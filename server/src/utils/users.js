import bcrypt from "bcrypt";
import Users from "../models/Users.js";

export async function isValidEmail(email) {
  // check if there is the same email in db
  const findUser = await Users.findOne({ email });
  return findUser ? false : true;
}

export function isRightPassword(password, confirmPassword) {
  // check if the password match
  const isPasswordMatch = password === confirmPassword;
  return isPasswordMatch;
}
isValidEmail("obada@email.com");
