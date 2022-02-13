import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;
const expensesSchema = new Schema({
  userId: { type: SchemaTypes.ObjectId, ref: "users", required: true },
  expenses: [
    {
      date: String,
      amount: Number,
      expensesCategory: String,
      expensesSubcategory: String,
    },
  ],
  income: [
    {
      date: String,
      amount: Number,
      expensesCategory: String,
    },
  ],
});

const Expenses = mongoose.model("expenses", expensesSchema);
export default Expenses;
