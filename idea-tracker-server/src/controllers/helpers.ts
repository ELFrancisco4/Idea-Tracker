import { UserModel } from "../models/users";
import bcrypt from "bcrypt";

type NotesProps = {
  title: string;
  category: string;
  body: string;
};

export const viewAllNotes = async (name: string) => {
  let err: string;
  try {
    const user = await UserModel.findOne({ name }).select({ notes: 1 }).exec();

    return user.get("notes");
  } catch (error) {
    err = error;
    return err;
  }
};

export const createUser = async (name, email, password) => {
  const newUser = new UserModel({
    name: name,
    email: email,
    password: password,
    notes: [],
  });
  await newUser.save();
};

export const getUser = async (name: string) => {
  const user = await UserModel.findOne({ name }).select({ password: 0 }).exec();
  if (user !== null) return user;
  return { err: "No user found in the db" };
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePasswords = async (
  password: string,
  name: string
): Promise<boolean | null> => {
  const query = await UserModel.findOne({ name })
    .select({ password: 1 })
    .exec();

  if (query) {
    const result = await bcrypt.compare(password, query.password);
    return result;
  }
  return;
};

export const deleteUser = async (name: string) => {
  await UserModel.deleteOne({ name }).exec();
  console.log(`User deleted`);
  return { msg: `${name} has been deleted successfully` };
};

export const createNote = async (name: string, noteObject: NotesProps) => {
  const query = await UserModel.findOne({ name }).exec();
  await query.notes.push(noteObject);
  await query.save();
};

export const deleteNote = async (name: string, noteIdx: number) => {
  const res = await UserModel.findOne({ name }).select({ notes: 1 }).exec();
  const newNotes = res.notes.filter((_, idx) => noteIdx !== idx);

  await UserModel.updateOne({ name }, { notes: newNotes }).exec();
};

export const viewOneNote = async (title: string, id: number) => {
  const query = await UserModel.findOne({ "notes.title": title }).exec();
  const note = query.notes[id - 1];
  return note;
};

export const updateNote = async (title: string, name: string, body: string) => {
  const res = await UserModel.findOneAndUpdate(
    { name, "notes.title": title },
    { $set: { "notes.$.body": body } },
    { new: true }
  );
  return res;
};

export const filterNotesByCriteria = (category: string) => {};
