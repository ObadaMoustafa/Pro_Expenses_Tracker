import Expenses from "../models/Expenses.js";
export const seedExpenses = async () => {
  await Expenses.create(dataToSeed);
};

const dataToSeed = [
  {
    userId: "620aa9618bf7aec0d83f21ce",
    expenses: [
      {
        date: "2022-01-01",
        amount: 500,
      },
      {
        date: "2022-01-02",
        amount: 500,
      },
      {
        date: "2022-01-05",
        amount: 500,
      },
      {
        date: "2022-01-25",
        amount: 500,
      },
      {
        date: "2022-01-28",
        amount: 500,
      },
      {
        date: "2022-01-29",
        amount: 500,
      },
      {
        date: "2022-02-03",
        amount: 500,
      },
      {
        date: "2022-02-04",
        amount: 500,
      },
      {
        date: "2022-02-07",
        amount: 500,
      },
      {
        date: "2022-02-08",
        amount: 500,
      },
    ],
    income: [
      {
        date: "2022-01-03",
        amount: 1800,
      },
      {
        date: "2022-01-05",
        amount: 1500,
      },
      {
        date: "2022-01-20",
        amount: 1500,
      },
      {
        date: "2022-01-25",
        amount: 1500,
      },
      {
        date: "2022-01-30",
        amount: 1500,
      },
      {
        date: "2022-02-01",
        amount: 1500,
      },
      {
        date: "2022-02-05",
        amount: 1500,
      },
      {
        date: "2022-02-08",
        amount: 1500,
      },
      {
        date: "2022-02-11",
        amount: 1500,
      },
      {
        date: "2022-02-12",
        amount: 1500,
      },
      {
        date: "2022-02-13",
        amount: 1500,
      },
    ],
  },
];
