import mongoose from "mongoose";
const { Schema } = mongoose;
const expensesSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
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
