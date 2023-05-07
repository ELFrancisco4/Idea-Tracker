"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterNotesByCriteria = exports.updateNote = exports.viewOneNote = exports.deleteNote = exports.createNote = exports.deleteUser = exports.comparePasswords = exports.hashPassword = exports.getUser = exports.createUser = exports.viewAllNotes = void 0;
const users_1 = require("../models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const viewAllNotes = (name) => __awaiter(void 0, void 0, void 0, function* () {
    let err;
    try {
        const user = yield users_1.UserModel.findOne({ name }).select({ notes: 1 }).exec();
        return user.get("notes");
    }
    catch (error) {
        err = error;
        return err;
    }
});
exports.viewAllNotes = viewAllNotes;
const createUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new users_1.UserModel({
        name: name,
        email: email,
        password: password,
        notes: [],
    });
    yield newUser.save();
});
exports.createUser = createUser;
const getUser = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.UserModel.findOne({ name }).select({ password: 0 }).exec();
    if (user !== null)
        return user;
    return { err: "No user found in the db" };
});
exports.getUser = getUser;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt();
    const hash = yield bcrypt_1.default.hash(password, salt);
    return hash;
});
exports.hashPassword = hashPassword;
const comparePasswords = (password, name) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield users_1.UserModel.findOne({ name })
        .select({ password: 1 })
        .exec();
    if (query) {
        const result = yield bcrypt_1.default.compare(password, query.password);
        return result;
    }
    return;
});
exports.comparePasswords = comparePasswords;
const deleteUser = (name) => __awaiter(void 0, void 0, void 0, function* () {
    yield users_1.UserModel.deleteOne({ name }).exec();
    console.log(`User deleted`);
    return { msg: `${name} has been deleted successfully` };
});
exports.deleteUser = deleteUser;
const createNote = (name, noteObject) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield users_1.UserModel.findOne({ name }).exec();
    yield query.notes.push(noteObject);
    yield query.save();
});
exports.createNote = createNote;
const deleteNote = (name, noteIdx) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield users_1.UserModel.findOne({ name }).select({ notes: 1 }).exec();
    const newNotes = res.notes.filter((_, idx) => noteIdx !== idx);
    yield users_1.UserModel.updateOne({ name }, { notes: newNotes }).exec();
});
exports.deleteNote = deleteNote;
const viewOneNote = (title, id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield users_1.UserModel.findOne({ "notes.title": title }).exec();
    const note = query.notes[id - 1];
    return note;
});
exports.viewOneNote = viewOneNote;
const updateNote = (title, name, body) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield users_1.UserModel.findOneAndUpdate({ name, "notes.title": title }, { $set: { "notes.$.body": body } }, { new: true });
    return res;
});
exports.updateNote = updateNote;
const filterNotesByCriteria = (category) => { };
exports.filterNotesByCriteria = filterNotesByCriteria;
//# sourceMappingURL=helpers.js.map