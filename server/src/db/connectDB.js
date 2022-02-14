import mongoose from "mongoose";

export const connectDB = () => mongoose.connect(process.env.MONGODB_URI);
export const dropDb = () => mongoose.createConnection(process.env.MONGODB_URI);
export const disconnectDb = () => mongoose.disconnect();
