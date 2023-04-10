import { Router, Request, Response } from "express";
import passport from "passport";

import * as helper from "./controllers/helpers";

export const userRouter = Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await helper.hashPassword(password);
  try {
    await helper.createUser(name, email, hashedPassword);
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(401).send({ success: false, message: error.message });
  }
});

userRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send({ success: true });
});

userRouter.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(301).redirect("/");
  });
});
