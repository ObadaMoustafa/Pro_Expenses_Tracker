import Users from "../models/Users.js";

export const seedUsers = async () => {
  await Users.create(dataToSeed);
};

const dataToSeed = [
  {
    name: "Test Account",
    email: "test@email.com",
    password: "1111",
    currency: "EUR",
    gender: "male",
    _id: "test",
  },
];
