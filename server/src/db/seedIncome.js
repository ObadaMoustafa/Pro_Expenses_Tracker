import Expenses from "../models/Expenses.js";
export const seedIncome = async expensesCollectionId => {
  const expensesCollection = await Expenses.findById(expensesCollectionId);
  const dataToSeed = [
    {
      category: "Crypto Currency",
      income: [
        {
          date: "2022-03-25",
          amount: 550,
          title: "code base",
        },
        {
          date: "2022-03-23",
          amount: 100,
          title: "code base",
        },
        {
          date: "2022-03-14",
          amount: 30,
          title: "code base",
        },
        {
          date: "2022-03-11",
          amount: 20,
          title: "code base",
        },
      ],
    },
    {
      category: "Freelance",
      income: [
        {
          date: "2022-03-17",
          amount: 30,
          title: "5X5",
        },
        {
          date: "2022-03-09",
          amount: 15,
          title: "5X5",
        },
      ],
    },
    {
      category: "Job salary",
      income: [
        {
          date: "2022-04-01",
          amount: 3500,
          title: "2nd month",
        },
        {
          date: "2022-03-01",
          amount: 3500,
          title: "bol 1st month",
        },
      ],
    },
    {
      category: "others",
      income: [
        {
          date: "2022-03-21",
          amount: 55,
          title: "Black work",
        },
        {
          date: "2022-03-13",
          amount: 55,
          title: "container work",
        },
      ],
    },
  ];
  expensesCollection.income = dataToSeed;

  await expensesCollection.save();
  console.log("income seeded");
};
