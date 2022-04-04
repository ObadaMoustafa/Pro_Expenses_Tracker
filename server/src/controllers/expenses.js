import Expenses from "../models/Expenses.js";
import produceExpensesObject from "../utils/produceExpensesObject.js";
export const getUserExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const allExpenses = await produceExpensesObject(userId);
    res.status(200).json({
      success: true,
      result: allExpenses,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const addExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const { category, subcategory, title, date, amount } = req.body;

    if (category === "none" || subcategory === "none")
      throw new Error("Category and subcategory are required");
    if (amount <= 0) throw new Error("Expenses amount can't be ZERO or LESS");

    const oldExpensesObject = await Expenses.findOne({ userId });
    // CHECK if the category and subcategory exist
    const { expenses } = oldExpensesObject;
    const categoryExists = expenses.find(
      exCategory => exCategory.category === category
    );
    if (!categoryExists) {
      // if category doesn't exist, create it
      const newExpenses = {
        category: category,
        subcategory: [
          {
            title: subcategory,
            expenses: [
              {
                title: title,
                date: date,
                amount: amount,
              },
            ],
          },
        ],
      };
      expenses.push(newExpenses);
    } else {
      // if category exists, check if subcategory exists
      const subcategoryExists = categoryExists.subcategory.find(
        exSubcategory => exSubcategory.title === subcategory
      );
      if (!subcategoryExists) {
        // if subcategory doesn't exist, create it and add the expense
        const newExpenses = {
          title: title,
          date: date,
          amount: amount,
        };
        categoryExists.subcategory.push({
          title: subcategory,
          expenses: [newExpenses],
        });
      } else {
        // if subcategory exists, add the expense
        const newExpenses = {
          title: title,
          date: date,
          amount: amount,
        };
        subcategoryExists.expenses.push(newExpenses);
      }
    }

    // update the expenses object
    await oldExpensesObject.save();

    // get the id of the expense
    const categoryObject = oldExpensesObject.expenses.find(
      exCategory => exCategory.category === category
    );
    const subcategoryObject = categoryObject.subcategory.find(
      exSubcategory => exSubcategory.title === subcategory
    );
    const expenseObject =
      subcategoryObject.expenses[subcategoryObject.expenses.length - 1];
    const _id = expenseObject._id;

    const allExpenses = await produceExpensesObject(userId);

    // send the response
    res.status(200).json({
      success: true,
      result: allExpenses,
      _id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const deleteExpenses = async (req, res) => {
  try {
    const { userId, expensesId } = req.params;

    const oldExpensesObject = await Expenses.findOne({ userId });
    const newExpensesObject = oldExpensesObject.expenses.filter(
      singleExpenses => singleExpenses._id.toString() !== expensesId
    );
    oldExpensesObject.expenses = newExpensesObject;
    await oldExpensesObject.save();

    const allExpenses = await produceExpensesObject(userId);

    res.status(200).json({
      success: true,
      result: allExpenses,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const addIncome = async (req, res) => {
  try {
    const { userId } = req.params;

    const { category, title, date, amount } = req.body;
    if (category === "none") throw new Error("Category is required");
    if (amount <= 0) throw new Error("Income amount can't be ZERO or LESS");

    const oldExpensesObject = await Expenses.findOne({ userId });
    const { income } = oldExpensesObject;

    // CHECK if the category exists
    const categoryExists = income.find(
      exCategory => exCategory.category === category
    );
    if (!categoryExists) {
      // if category doesn't exist, create it
      const newIncome = {
        category: category,
        income: [
          {
            date: date,
            amount: amount,
            title: title,
          },
        ],
      };
      income.push(newIncome);
    } else {
      // if category exists, add the income
      const newIncome = {
        date: date,
        amount: amount,
        title: title,
      };
      categoryExists.income.push(newIncome);
    }

    // update the expenses object
    await oldExpensesObject.save();

    // get the id of the expense
    const categoryObject = oldExpensesObject.income.find(
      inCategory => inCategory.category === category
    );
    const incomeObject =
      categoryObject.income[categoryObject.income.length - 1];
    const _id = incomeObject._id;

    const allExpenses = await produceExpensesObject(userId);

    res.status(200).json({
      success: true,
      result: allExpenses,
      _id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { userId, incomeId } = req.params;

    const oldExpensesObject = await Expenses.findOne({ userId });
    const newExpensesObject = oldExpensesObject.income.filter(
      singleExpenses => singleExpenses._id.toString() !== incomeId
    );
    oldExpensesObject.income = newExpensesObject;
    await oldExpensesObject.save();

    const allExpenses = await produceExpensesObject(userId);

    res.status(200).json({
      success: true,
      result: allExpenses,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
