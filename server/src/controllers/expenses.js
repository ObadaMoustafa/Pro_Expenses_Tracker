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
    let _id;

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
      // if category doesn't exist, create it and sort categories
      const newCategoryWithInfo = {
        category: category,
        subcategory: [
          {
            title: subcategory,
            expenses: [
              {
                title,
                date,
                amount,
              },
            ],
          },
        ],
      };
      expenses.push(newCategoryWithInfo);
      const lastIndex = expenses.length - 1;
      _id = expenses[lastIndex].subcategory[0].expenses[0]._id.toString();
      expenses.sort((a, b) => a.category.localeCompare(b.category));
    } else {
      // if category exists, check if subcategory exists
      const subcategoryExists = categoryExists.subcategory.find(
        exSubcategory => exSubcategory.title === subcategory
      );
      if (!subcategoryExists) {
        // if subcategory doesn't exist, create and sort it.
        const newSubcategoryWithInfo = {
          title: subcategory,
          expenses: [{ title, date, amount }],
        };

        categoryExists.subcategory.push(newSubcategoryWithInfo);
        // get the id of the last expense
        const lastIndex = categoryExists.subcategory.length - 1;
        _id = categoryExists.subcategory[lastIndex].expenses[0]._id.toString();

        // sort subcategories.
        categoryExists.subcategory.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else {
        // if subcategory exists => add the expense and sort it.
        const newExpenses = {
          title,
          date,
          amount,
        };

        subcategoryExists.expenses.push(newExpenses);
        const lastIndex = subcategoryExists.expenses.length - 1;
        _id = subcategoryExists.expenses[lastIndex]._id.toString();
        subcategoryExists.expenses.sort((a, b) => b.date.localeCompare(a.date));
      }
    }

    // Save the expenses object if everything is ok
    await oldExpensesObject.save();

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
    let _id;

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
      _id = income[income.length - 1].income[0]._id.toString();
      income.sort((a, b) => a.category.localeCompare(b.category));
    } else {
      // if category exists => add the income and sort it.
      const newIncome = {
        date: date,
        amount: amount,
        title: title,
      };
      categoryExists.income.push(newIncome);
      const lastIndex = categoryExists.income.length - 1;
      _id = categoryExists.income[lastIndex]._id.toString();
      categoryExists.income.sort((a, b) => b.date.localeCompare(a.date));
    }

    // update the expenses object
    await oldExpensesObject.save();
    console.log(_id);
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
