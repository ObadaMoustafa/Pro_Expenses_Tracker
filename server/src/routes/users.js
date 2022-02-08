import express from "express";
import { createNewUser, login } from "../controllers/users.js";
const usersRouter = express.Router();

usersRouter.post("/createUser", createNewUser);
usersRouter.post("/login", login);

export default usersRouter;
