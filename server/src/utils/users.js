import Expenses from "../models/Expenses.js";
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

export async function createNewUser(name, email, password, currency, gender) {
  const newUser = await Users.create({
    name,
    email,
    password,
    currency,
    gender,
  });

  const result = {
    name: newUser.name,
    email: newUser.email,
    currency: newUser.currency,
    gender: newUser.gender,
    _id: newUser._id,
  };

  return result;
}

export async function createExpensesDocument(userId) {
  const userExpensesDocument = await Expenses.create({ userId });
  return userExpensesDocument;
}
