import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import {
  createExpensesDocument,
  createNewUser,
  isRightPassword,
  isValidEmail,
} from "../utils/users.js";
import getSymbolFromCurrency from "currency-symbol-map";

export const signUpProcess = async (req, res) => {
  const { name, email, password, confirmPassword, currency, gender } = req.body;

  try {
    //check if the email is valid
    if (!(await isValidEmail(email.toLowerCase())))
      throw new Error("This email is already exists .. you may need to login");
    // check if passwords are match
    console.log("is match pass:", isRightPassword(password, confirmPassword));
    if (!isRightPassword(password, confirmPassword))
      throw new Error("Password doesn't match");

    // create hash to secure the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // if no currency use EUR
    let theCurrency = getSymbolFromCurrency(currency);
    if (!theCurrency)
      throw new Error(
        "This currency code isn't available please right a right code like EGP , USD or EUR"
      );
    // if everything is okay we can create a new account
    // return the user object to response without the password
    const result = await createNewUser(
      name,
      email.toLowerCase(),
      hashedPassword,
      theCurrency,
      gender
    );

    // we create expenses document with empty expenses and income arrays.
    const userExpensesDocument = createExpensesDocument(result._id);

    res.status(200).json({
      success: true,
      result,
      userExpensesDocument,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: `Error: ${error.message}`,
    });

    console.error(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      throw new Error(
        "like any website in the world => Email and password are required to login"
      );
    // check if email is exist
    const loginUser = await Users.findOne({ email: email.toLowerCase() });
    if (!loginUser)
      throw new Error(
        "This Email is not exist .. maybe you need to create and account"
      );

    // compare and check the password
    const hash = loginUser.password;
    const isCorrectPassword = bcrypt.compareSync(password, hash); // true
    if (!isCorrectPassword) throw new Error("Wrong password");

    // return the user object to response without the password
    const result = {
      name: loginUser.name,
      email: loginUser.email,
      currency: loginUser.currency,
      _id: loginUser._id,
      gender: loginUser.gender,
    };
    //login successfully
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: `Error: ${error.message}`,
    });
  }
};
