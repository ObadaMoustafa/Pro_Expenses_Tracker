import express from "express";
const testRouter = express.Router();

testRouter.get("/", (req, res) => {
  console.log("server is connected successfully");
});

export default testRouter;
