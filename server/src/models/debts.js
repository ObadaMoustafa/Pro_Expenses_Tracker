import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;

const debtsSchema = new Schema({
  userId: { type: SchemaTypes.ObjectId, ref: "users", required: true },
  title: { type: String, required: true },
  startDate: { type: String, required: true },
  amount: { type: Number, required: true },
  deadLineDate: { type: String, required: true },
  hasPaid: { type: Boolean, default: false },
  payHistory: [
    {
      date: String,
      amount: Number,
    },
  ],
});

const Debts = mongoose.model("debts", debtsSchema);
export default Debts;
