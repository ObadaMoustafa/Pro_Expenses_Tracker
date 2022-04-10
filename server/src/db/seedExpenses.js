import Expenses from "../models/Expenses.js";
export const seedExpenses = async expensesCollectionId => {
  const expensesCollection = await Expenses.findById(expensesCollectionId);
  const dataToSeed = [
    {
      category: "clothing",
      subcategories: [
        {
          title: "Adults' clothing",
          expenses: [
            {
              title: "jacket",
              date: "2022-03-03",
              amount: 20,
            },
          ],
        },
        {
          title: "Children's shoes",
          expenses: [
            {
              title: "for kids",
              date: "2022-03-24",
              amount: 43,
            },
          ],
        },
      ],
    },
    {
      category: "Food",
      subcategories: [
        {
          title: "Restaurants",
          expenses: [
            {
              title: "for Yunus",
              date: "2022-03-22",
              amount: 12,
            },
            {
              title: "with family",
              date: "2022-03-18",
              amount: 50,
            },
          ],
        },
      ],
    },
    {
      category: "Housing",
      subcategories: [
        {
          title: "House rent",
          expenses: [
            {
              title: "2nd month",
              date: "2022-04-01",
              amount: 750,
            },
            {
              title: "1st month",
              date: "2022-03-01",
              amount: 750,
            },
          ],
        },
      ],
    },
    {
      category: "Transportation",
      subcategories: [
        {
          title: "Bus",
          expenses: [
            {
              title: "mmmm",
              date: "2022-03-25",
              amount: 5,
            },
            {
              title: "mmmm",
              date: "2022-03-18",
              amount: 5,
            },
            {
              title: "mmmm",
              date: "2022-03-11",
              amount: 5,
            },
            {
              title: "mmmm",
              date: "2022-03-04",
              amount: 5,
            },
          ],
        },
        {
          title: "train",
          expenses: [
            {
              title: "with wife",
              date: "2022-03-29",
              amount: 4.5,
            },
          ],
        },
      ],
    },
    {
      category: "Utilities",
      subcategories: [
        {
          title: "Electricity",
          expenses: [
            {
              title: "2nd month",
              date: "2022-04-07",
              amount: 200,
            },
            {
              title: "1st month",
              date: "2022-03-07",
              amount: 200,
            },
          ],
        },
      ],
    },
  ];
  expensesCollection.expenses = dataToSeed;

  await expensesCollection.save();
  console.log("Expenses seeded");
};
