import mongoose from "mongoose";
const { Schema } = mongoose;
const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  currency: { type: String, default: "EUR" },
  gender: { type: String, enum: ["male", "female"] },
});

const Users = mongoose.model("users", usersSchema);
export default Users;
