import express from "express";
import {
  signUpProcess,
  login,
  changeName,
  changeEmail,
  changeCurrency,
} from "../controllers/users.js";
const usersRouter = express.Router();

usersRouter.post("/createUser", signUpProcess);
usersRouter.post("/login", login);
usersRouter.put("/changeName", changeName);
usersRouter.put("/changeEmail", changeEmail);
usersRouter.put("/changeCurrency", changeCurrency);

export default usersRouter;
