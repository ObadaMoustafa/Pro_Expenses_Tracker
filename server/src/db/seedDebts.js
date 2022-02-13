import Debts from "../models/debts.js";
export const seedDebts = async () => {
  await Debts.create(dataToSeed);
};

const dataToSeed = [
  {
    userId: "62080199a9c52293e8d91610",
    title: "From Ahmed to pay my house rent",
    date: "2021-12-15",
    amount: 850,
    deadLine: "2022-05-15",
    payHistory: [
      {
        date: "2022-01-01",
        amount: 150,
      },
      {
        date: "2022-01-15",
        amount: 150,
      },
      {
        date: "2022-01-21",
        amount: 150,
      },
      {
        date: "2022-01-30",
        amount: 150,
      },
      {
        date: "2022-02-08",
        amount: 150,
      },
      {
        date: "2022-02-13",
        amount: 50,
      },
    ],
  },
  {
    userId: "62080199a9c52293e8d91610",
    title: "From Faddy to renew my passport",
    date: "2022-01-05",
    amount: 1600,
    deadLine: "2022-05-25",
    payHistory: [
      {
        date: "2022-01-15",
        amount: 150,
      },
      {
        date: "2022-01-25",
        amount: 175,
      },
      {
        date: "2022-02-10",
        amount: 250,
      },
      {
        date: "2022-02-13",
        amount: 50,
      },
    ],
  },
];
