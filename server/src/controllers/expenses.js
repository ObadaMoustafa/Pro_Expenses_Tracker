import Expenses from "../models/Expenses.js";

export const getUserExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const userExpenses = await Expenses.findOne({ userId });
    res.status(200).json({
      success: true,
      result: userExpenses,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
