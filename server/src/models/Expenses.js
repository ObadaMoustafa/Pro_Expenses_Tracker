import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;
const expensesSchema = new Schema({
  userId: { type: SchemaTypes.ObjectId, ref: "users", required: true },
  expenses: {
    type: [
      {
        date: String,
        amount: Number,
        expensesCategory: String,
        expensesSubcategory: String,
      },
    ],
    default: null,
  },
  income: {
    type: [
      {
        date: String,
        amount: Number,
        expensesCategory: String,
      },
    ],
    default: null,
  },
});

const Expenses = mongoose.model("expenses", expensesSchema);
export default Expenses;
