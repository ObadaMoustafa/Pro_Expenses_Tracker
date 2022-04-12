/* this function could be refactored more
but I prefer to keep as it is for be more readable */
export function deleteExpenseTransaction(
  setFunc,
  categoryId,
  subcategoryId,
  transactionId,
  type
) {
  if (type === "expenses") {
    setFunc(prev => {
      const allCategories = [...prev];
      let categoryIndex;
      let subcategoryIndex;

      const category = allCategories.find((category, index) => {
        const condition = category._id === categoryId;
        if (condition) {
          categoryIndex = index;
        }
        return condition;
      });

      const subcategory = category.subcategories.find((subcategory, index) => {
        const condition = subcategory._id === subcategoryId;
        if (condition) {
          subcategoryIndex = index;
        }
        return condition;
      });

      // delete the transaction
      for (let i = 0; i < subcategory.expenses.length; i++) {
        if (subcategory.expenses[i]._id === transactionId) {
          subcategory.expenses.splice(i, 1);
          break;
        }
      }

      // delete subcategory if empty
      const isEmptySubcategory = subcategory.expenses.length === 0;
      if (isEmptySubcategory) {
        allCategories[categoryIndex].subcategories.splice(subcategoryIndex, 1);
      }

      // delete category if empty
      const isEmptyCategory =
        allCategories[categoryIndex].subcategories.length === 0;
      if (isEmptyCategory) {
        allCategories.splice(categoryIndex, 1);
      }

      return allCategories;
    });
  } else {
    setFunc(prev => {
      const allCategories = [...prev];
      let categoryIndex;
      const category = allCategories.find((category, index) => {
        const condition = category._id === categoryId;
        if (condition) {
          categoryIndex = index;
        }
        return condition;
      });

      // delete the transaction
      for (let i = 0; i < category.income.length; i++) {
        if (category.income[i]._id === transactionId) {
          category.income.splice(i, 1);
          break;
        }
      }

      // delete category if empty
      const isEmptyCategory = category.income.length === 0;
      if (isEmptyCategory) {
        allCategories.splice(categoryIndex, 1);
      }

      return allCategories;
    });
  }
}

export function deleteTheCategory(setFunc, categoryId) {
  setFunc(prev => {
    const allCategories = [...prev];
    const categoryIndex = allCategories.findIndex(
      category => category._id === categoryId
    );
    allCategories.splice(categoryIndex, 1);
    return allCategories;
  });
}
