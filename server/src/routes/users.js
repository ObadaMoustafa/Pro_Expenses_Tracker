import express from "express";
import { createNewUser } from "../controllers/users.js";
const usersRouter = express.Router();

usersRouter.post("/createUser", createNewUser);

export default usersRouter;
