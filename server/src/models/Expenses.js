import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;
const expensesSchema = new Schema({
  userId: { type: SchemaTypes.ObjectId, ref: "users", required: true },
  expenses: {
    type: [
      {
        category: String,
        subcategories: [
          {
            title: String,
            expenses: [
              {
                title: String,
                date: String,
                amount: Number,
              },
            ],
          },
        ],
      },
    ],
    default: [],
  },
  income: {
    type: [
      {
        category: String,
        income: [
          {
            date: String,
            amount: Number,
            title: String,
          },
        ],
      },
    ],
    default: [],
  },
});

const Expenses = mongoose.model("expenses", expensesSchema);
export default Expenses;
