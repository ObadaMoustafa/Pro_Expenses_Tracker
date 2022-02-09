import Users from "../models/Users.js";
import bcrypt from "bcrypt";

export const createNewUser = async (req, res) => {
  const { name, email, password, currency } = req.body;
  // create hash to secure the password
  const hash = bcrypt.hashSync(password, 10);
  try {
    await Users.create({
      name,
      email,
      password: hash,
      currency,
    });
    const newUser = await Users.findOne({ email });
    if (!newUser) throw new Error("user is not found");
    res.status(200).json({
      success: true,
      result: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        success: false,
        msg: "Error: this email is used before!",
      });
    } else {
      res.status(400).json({
        success: false,
        msg: `Error happened: ${error.message}`,
      });
    }

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
    const isUser = await Users.findOne({ email });
    if (!isUser)
      throw new Error(
        "This Email is not exist .. maybe you need to create and account"
      );

    // compare and check the password
    const hash = isUser.password;
    const isCorrectPassword = bcrypt.compareSync(password, hash); // true
    if (!isCorrectPassword) throw new Error("Wrong password");

    //login successfully
    res.status(200).json({
      success: true,
      result: isUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: `Error: ${error.message}`,
    });
  }
};
