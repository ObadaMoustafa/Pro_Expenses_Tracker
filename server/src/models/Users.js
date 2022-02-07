import mongoose from "mongoose";
const { Schema } = mongoose;
const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  currency: { type: String, required: true },
});

const Users = mongoose.model("users", usersSchema);
export default Users;
