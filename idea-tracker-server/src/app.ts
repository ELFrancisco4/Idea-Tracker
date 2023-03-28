import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDb } from "./controllers/db";
import passport from "passport";
import {
  createUser,
  viewAllNotes,
  hashPassword,
  getUser,
  deleteUser,
  createNote,
  deleteNote,
  viewOneNote,
} from "./controllers/helpers";
import { instantiateAuth } from "./controllers/auth";
import { UserModel } from "./models/users";
import session from "express-session";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
connectToDb();

app.use(passport.initialize());

app.use(passport.session());

instantiateAuth(passport);

app.get("/notes", (req: Request, res: Response) => {
  const query = viewAllNotes();
  try {
    query.then((userNotes) => {
      res.status(200).json(userNotes);
    });
  } catch (error) {
    res.status(500).json({ err: "Could not get user data" });
  }
});

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Welcome to the notes app" });
});

app.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  createUser(name, email, hashedPassword);
  res.status(200).send("User created successfully");
  res.redirect("/login");
});

app.post(
  // "/login",
  // passport.authenticate("local", {
  //   "/login",
  // }),
  "/login",
  (req, res) => {
    res.redirect("/home");
  }
);

app.get("/notes/:id", (req: Request, res: Response) => {
  const { title } = req.body;
  const id = parseInt(req.params.id);
  const query = viewOneNote(title, id);
  try {
    query.then((userNote) => {
      res.status(200).json(userNote);
    });
  } catch (error) {
    res.status(500).json({ err: "Could not get user data" });
  }
});

app.get("/home", async (req, res) => {
  const { name } = req.body;
  const user = await getUser(name);
  res.send(user);
});


app.delete("/home", async (req, res) => {
  const { name } = req.body;
  await deleteUser(name);
  res.send(`User ${name} has been deleted`);
});

app.delete("/remove-note", async (req, res) => {
  const { name, id } = req.body;

  await deleteNote(name, id);

  res.status(200).send("Note deleted successfully");
});

app.post("/new", async (req, res) => {
  const { title, category, body, name } = req.body;
  const note = {
    title,
    category,
    body,
  };
  await createNote(name, note);
  res.status(200).send("Note created successfully");
});

app.put("/edit/:id", (req, res) => {
  const { title } = req.body;
  const id = parseInt(req.params.id);
});

// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = await hashPassword(password);
//   const registerUser = await UserModel.register({name: name}, password: hashedPassword);
//   try {
//     if (registerUser) {
//      await passport.authenticate("local")(req, res, () => {
//         res.redirect("/login");
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ err: "Could not register user" });
//     console.log(registerUser)
//   }
// });

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
