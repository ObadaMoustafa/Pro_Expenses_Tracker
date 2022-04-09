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
        subcategories: [
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
      _id = expenses[lastIndex].subcategories[0].expenses[0]._id.toString();
      expenses.sort((a, b) => a.category.localeCompare(b.category));
    } else {
      // if category exists, check if subcategory exists
      const subcategoryExists = categoryExists.subcategories.find(
        exSubcategory => exSubcategory.title === subcategory
      );
      if (!subcategoryExists) {
        // if subcategory doesn't exist, create and sort it.
        const newSubcategoryWithInfo = {
          title: subcategory,
          expenses: [{ title, date, amount }],
        };

        categoryExists.subcategories.push(newSubcategoryWithInfo);
        // get the id of the last expense
        const lastIndex = categoryExists.subcategories.length - 1;
        _id =
          categoryExists.subcategories[lastIndex].expenses[0]._id.toString();

        // sort subcategories.
        categoryExists.subcategories.sort((a, b) =>
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

export const deleteExpensesCategory = async (req, res) => {
  try {
    const { userId, categoryId } = req.params;
    const oldExpensesObject = await Expenses.findOne({ userId });
    const { expenses } = oldExpensesObject;
    let categoryIndex;
    const categoryObject = expenses.find((exCategory, index) => {
      const condition = exCategory._id.toString() === categoryId;
      if (condition) categoryIndex = index;
      return condition;
    });
    if (!categoryObject)
      throw new Error(`Category id ${categoryId} doesn't exist`);
    expenses.splice(categoryIndex, 1);
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

export const deleteExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const { categoryId, subcategoryId, transactionId } = req.body;

    const oldExpensesObject = await Expenses.findOne({ userId });
    const { expenses } = oldExpensesObject;
    // track the expense to delete
    // find category > sub > expense > delete
    let categoryIndex;
    let subcategoryIndex;
    let expenseIndex;

    // 1- find and check
    const categoryObject = expenses.find((category, index) => {
      const condition = category._id.toString() === categoryId;
      if (condition) categoryIndex = index;

      return condition;
    });
    if (!categoryObject) throw new Error("Category is not exists");

    const subcategoryObject = categoryObject.subcategories.find(
      (subcategory, index) => {
        const condition = subcategory._id.toString() === subcategoryId;
        if (condition) subcategoryIndex = index;

        return condition;
      }
    );
    if (!subcategoryObject) throw new Error("Subcategory is not exists");
    const expenseObject = subcategoryObject.expenses.find((expense, index) => {
      const condition = expense._id.toString() === transactionId;
      if (condition) expenseIndex = index;

      return condition;
    });
    if (!expenseObject) throw new Error("This transaction is not Exists");

    // 2- deletion
    // delete transaction
    subcategoryObject.expenses.splice(expenseIndex, 1);
    // Delete subcategory if it's empty
    if (subcategoryObject.expenses.length === 0)
      categoryObject.subcategories.splice(subcategoryIndex, 1);

    // Delete Category if it's empty
    if (categoryObject.subcategories.length === 0)
      expenses.splice(categoryIndex, 1);

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
    const categoryObject = income.find(
      exCategory => exCategory.category === category
    );
    if (!categoryObject) {
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
      categoryObject.income.push(newIncome);
      const lastIndex = categoryObject.income.length - 1;
      _id = categoryObject.income[lastIndex]._id.toString();
      categoryObject.income.sort((a, b) => b.date.localeCompare(a.date));
    }

    // update the expenses object
    await oldExpensesObject.save();
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

export const deleteIncomeCategory = async (req, res) => {
  try {
    const { userId, categoryId } = req.params;

    const oldExpensesObject = await Expenses.findOne({ userId });
    const { income } = oldExpensesObject;
    let categoryIndex;
    const categoryObject = income.find((category, index) => {
      const condition = category._id.toString() === categoryId;
      if (condition) categoryIndex = index;
      return condition;
    });
    if (!categoryObject) throw new Error("Category is not exists");
    income.splice(categoryIndex, 1);
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
export const deleteIncome = async (req, res) => {
  try {
    const { userId } = req.params;
    const { categoryId, transactionId } = req.body;
    const ExpensesObject = await Expenses.findOne({ userId });
    const { income } = ExpensesObject;
    // track the expense to delete
    // find category > transaction > delete
    let categoryIndex;
    let transactionIndex;
    const categoryObject = income.find((category, index) => {
      const condition = category._id.toString() === categoryId;
      if (condition) categoryIndex = index;
      return condition;
    });
    if (!categoryObject) throw new Error("Category is not exists");

    const transactionObject = categoryObject.income.find(
      (transaction, index) => {
        const condition = transaction._id.toString() === transactionId;
        if (condition) transactionIndex = index;
        return condition;
      }
    );
    if (!transactionObject) throw new Error("Income Transaction is not exists");

    // 2- deletion
    // delete transaction
    categoryObject.income.splice(transactionIndex, 1);
    // Delete category if it's empty
    if (categoryObject.income.length === 0) income.splice(categoryIndex, 1);

    await ExpensesObject.save();

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
