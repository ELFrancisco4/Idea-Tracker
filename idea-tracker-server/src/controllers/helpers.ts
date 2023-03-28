import { UserModel } from "../models/users";
import bcrypt from "bcrypt";


type NotesProps = {
  title: string;
  category: string;
  body: string;
};

export const viewAllNotes = async () => {
  let err: string;
  try {
    let users = await UserModel.find().select({ name: 0, password: 0 }).exec();
    return users;
  } catch (error) {
    err = error;
    return err;
  }
};

export const createUser = async (name,email, password) => {
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
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password,salt);
  return hash;
};

export const comparePasswords = async (
  password: string,
  name: string
): Promise<boolean | null> => {
  const query = await UserModel.findOne({ name })
    .select({ password: 1 })
    .exec();

  console.log(query);
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

export const deleteNote = async (name: string, id: number) => {
  const query = await UserModel.findOne({ name }).select({ notes: 1 }).exec();
  await query.notes.splice(id, 1);
  console.log(query.notes);
  await query.save();
  
};

export const viewOneNote = async (title:string, id:number) => {
  const query = await UserModel.findOne({"notes.title": title}).exec();
  const note = query.notes[id-1]
  return note
};

export const updateNote = async (title: string, id:number) => {
  const query = await UserModel.findOne({"notes.title": title}).exec();
  
};


export const filterNotesByCriteria = (category: string) => {

};
