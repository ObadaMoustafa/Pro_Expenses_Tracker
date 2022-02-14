import express from "express";
import { signUpProcess, login } from "../controllers/users.js";
const usersRouter = express.Router();

usersRouter.post("/createUser", signUpProcess);
usersRouter.post("/login", login);

export default usersRouter;
