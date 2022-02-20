import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;

const debtsSchema = new Schema({
  userId: { type: SchemaTypes.ObjectId, ref: "users", required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  deadLine: { type: String, required: true },
  payHistory: [
    {
      date: String,
      amount: Number,
    },
  ],
});

const Debts = mongoose.model("debts", debtsSchema);
export default Debts;
