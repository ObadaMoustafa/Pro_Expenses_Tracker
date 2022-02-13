import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;

const debtsSchema = new Schema({
  userId: { type: SchemaTypes.ObjectId, ref: "users", required: true },
  title: String,
  date: String,
  amount: Number,
  deadLine: String,
  payHistory: [
    {
      date: String,
      amount: Number,
    },
  ],
});

const Debts = mongoose.model("debts", debtsSchema);
export default Debts;
