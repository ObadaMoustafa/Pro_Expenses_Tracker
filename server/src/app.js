import express from "express";
import cors from "cors";
import testRouter from "./routes/test.js";

export const app = express();

// use json middleware
app.use(express.json());

//let everyone use our api
app.use(cors());

app.use("/api/test", testRouter);