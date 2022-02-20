import Debts from "../models/debts.js";

export const createNewDebt = async (req, res) => {
  try {
    const { userId } = req.params;
    const newDebt = await Debts.create({ userId, ...req.body });

    res.status(200).json({
      success: true,
      result: newDebt,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const payDebts = async (req, res) => {
  try {
    const { debtId } = req.params;
    const theDebt = await Debts.findById(debtId);
    await theDebt.payHistory.unshift(req.body);
    await theDebt.save();

    res.status(200).json({
      success: true,
      result: theDebt,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
