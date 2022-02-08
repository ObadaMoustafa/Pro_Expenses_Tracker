import mongoose, { SchemaTypes } from "mongoose";
const { Schema } = mongoose;
const expensesSchema = new Schema({
  userId: { type: SchemaTypes.ObjectId, ref: "users", required: true },
  expenses: [
    {
      date: Date,
      amount: Number,
      expensesCategory: String,
      expensesSubcategory: String,
    },
  ],
  income: [
    {
      date: Date,
      amount: Number,
      expensesCategory: String,
    },
  ],
});

const Expenses = mongoose.model("expenses", expensesSchema);
export default Expenses;
