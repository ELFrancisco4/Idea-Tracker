import { Router, Request as ExpressRequest, Response } from "express";

import * as helper from "../controllers/helpers";

export const noteRouter = Router();

interface Request extends ExpressRequest {
  user: {
    name: string;
    notes: string[];
  };
}

noteRouter.delete("/delete-all-notes", async (req: Request, res: Response) => {
  try {
    await helper.deleteAllNotes(req.user.name);
  } catch (error) {
    console.log(error);
  }
  res.send({ success: true, message: "Notes deleted successfully" });
});
noteRouter.get("/notes", async (req: Request, res: Response) => {
  const notes = await helper.viewAllNotes(req.user.name);
  res.send(notes);
});

noteRouter.get("/notes/:id", (req: Request, res: Response) => {
  const { title } = req.body;
  const id = parseInt(req.params.id);
  const query = helper.viewOneNote(title, id);
  try {
    query.then((userNote) => {
      res.status(200).json(userNote);
    });
  } catch (error) {
    res.status(500).json({ err: "Could not get user data" });
  }
});

noteRouter.delete("/remove-note/:id", async (req: Request, res: Response) => {
  const query = await helper.deleteNote(req.user.name, parseInt(req.params.id));
  if (query) res.send({ success: true, message: "Note deleted successfully" });
  else
    res.send({
      success: false,
      message: "Something went wrong, try again later",
    });
});

noteRouter.post("/notes", async (req: Request, res) => {
  const { title, category, body } = req.body;
  const note = {
    title,
    category,
    body,
  };

  await helper.createNote(req.user.name, note);
  res.send({ success: true });
});

noteRouter.put("/edit", async (req, res) => {
  const { name, title, body } = req.body;
  const updatedNote = await helper.updateNote(title, name, body);
  if (updatedNote) {
    res.json({
      success: true,
      message: `Note with the title ${title} changed successfully`,
    });
  } else
    res
      .status(500)
      .json({ success: false, err: "No such note found in the database" });
});
