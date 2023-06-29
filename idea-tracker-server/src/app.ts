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
const fs = require("fs");

const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan("combined"));

app.use(
  cors({
    origin: ["https://idea-tracker-six.vercel.app", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

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
