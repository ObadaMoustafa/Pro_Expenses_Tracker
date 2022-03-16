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

    // check if the currency is available
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

export const changeName = async (req, res) => {
  const { userId, newName } = req.body;
  try {
    // if name is empty throw an error
    if (!newName) throw new Error("new name shouldn't be empty");
    //find user and check if the new name is the same as old one
    const userObject = await Users.findById(userId);
    if (userObject.name === newName)
      throw new Error(`${newName} is already the current name`);

    // update name
    userObject.name = newName;
    await userObject.save();

    //find after updating
    const userAfterUpdate = await Users.findById(userId);

    // return the user object to response without the password
    const result = {
      name: userAfterUpdate.name,
      email: userAfterUpdate.email,
      currency: userAfterUpdate.currency,
      _id: userAfterUpdate._id,
      gender: userAfterUpdate.gender,
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

export const changeEmail = async (req, res) => {
  const { userId, newEmail } = req.body;
  try {
    // if new email is empty throw an error
    if (!newEmail) throw new Error("New email shouldn't be empty");

    const email = newEmail.toLowerCase();

    //find user and check if the new email is the same as old one
    const userObject = await Users.findById(userId);
    if (userObject.email === email)
      throw new Error(`${email} is already the current email`);

    //check if this email is valid to use
    const notAValidEmail = await Users.findOne({ email: newEmail });
    if (notAValidEmail) throw new Error("This email is not valid to use");

    // update email
    userObject.email = email;
    await userObject.save();

    //find after updating
    const userAfterUpdate = await Users.findById(userId);

    // return the user object to response without the password
    const result = {
      name: userAfterUpdate.name,
      email: userAfterUpdate.email,
      currency: userAfterUpdate.currency,
      _id: userAfterUpdate._id,
      gender: userAfterUpdate.gender,
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

export const changeCurrency = async (req, res) => {
  const { userId, newCurrency } = req.body;
  try {
    // if new currency is empty throw an error
    if (!newCurrency) throw new Error("new currency shouldn't be empty");

    // check if the currency is available
    let newCurrencySymbol = getSymbolFromCurrency(newCurrency);
    if (!newCurrencySymbol)
      throw new Error(
        "This currency code isn't available please right a right code like EGP , USD or EUR"
      );

    //find user and check if the new currency symbol is the same as old one
    const userObject = await Users.findById(userId);
    if (userObject.currency === newCurrencySymbol)
      throw new Error(
        `${newCurrency} or ${newCurrencySymbol} is already the current currency`
      );

    // update name
    userObject.currency = newCurrencySymbol;
    await userObject.save();

    //find after updating
    const userAfterUpdate = await Users.findById(userId);

    // return the user object to response without the password
    const result = {
      name: userAfterUpdate.name,
      email: userAfterUpdate.email,
      currency: userAfterUpdate.currency,
      _id: userAfterUpdate._id,
      gender: userAfterUpdate.gender,
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

export const changePassword = async (req, res) => {
  const { userId, oldPassword, newPassword, confirmNewPassword } = req.body;
  try {
    // check if the old password is right or throw an error
    const userObject = await Users.findByIdAndUpdate(userId);
    const currentPassword = userObject.password;
    const isCorrectPassword = bcrypt.compareSync(oldPassword, currentPassword);
    if (!isCorrectPassword)
      throw new Error(
        "Old password is wrong .. please make sure you wrote it right or turn off the CAPS LOCK"
      );

    // throw error if the new password is the same as old one
    if (newPassword === oldPassword)
      throw new Error("(New password) should be different from the old one");
    // check if the new password matches the confirmation or throw an error
    if (newPassword !== confirmNewPassword)
      throw new Error(
        "(New password) and (Confirm new password) fields are not match"
      );

    // if everything is right hash the password and update it
    const hashNewPassword = bcrypt.hashSync(newPassword, 10);
    userObject.password = hashNewPassword;
    await userObject.save();

    // return the user object to response without the password
    const result = {
      name: userObject.name,
      email: userObject.email,
      currency: userObject.currency,
      _id: userObject._id,
      gender: userObject.gender,
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
