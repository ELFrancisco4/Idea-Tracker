import dotenv from "dotenv";
dotenv.config();
import express from "express";
const passport = require("passport");
const cors = require("cors");
import session from "express-session";

import { connectToDb } from "./controllers/db";
import { homeRouter } from "./home";
import { userRouter } from "./user";
import { guardedRouter } from "./guarded";
import { instantiateAuth } from "./controllers/auth";

const PORT = process.env.PORT || 5000;
const app = express();

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.set("Vary", "Origin");
  next();
};
app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "hackingisillegal",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

instantiateAuth(passport);

app.use(homeRouter);
app.use(userRouter);
app.use(guardedRouter);

app.listen(PORT, async () => {
  await connectToDb();
  console.log(`App is listening on port ${PORT}`);
});
