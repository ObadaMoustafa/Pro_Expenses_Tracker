import Users from "../models/Users.js";

export const createNewUser = async (req, res) => {
  try {
    const { user } = req.body;
    if (!user || typeof user !== "object")
      throw new Error("user info should be an object in the request body");
    const newUser = await Users.create(user);
    res.status(200).json({
      success: true,
      result: newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      result: `Error happened: ${error.message}`,
    });

    console.error(error);
  }
};
