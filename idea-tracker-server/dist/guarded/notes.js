"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRouter = void 0;
const express_1 = require("express");
const helper = __importStar(require("../controllers/helpers"));
exports.noteRouter = (0, express_1.Router)();
exports.noteRouter.get("/notes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield helper.viewAllNotes(req.user.name);
    res.send(notes);
}));
exports.noteRouter.get("/notes/:id", (req, res) => {
    const { title } = req.body;
    const id = parseInt(req.params.id);
    const query = helper.viewOneNote(title, id);
    try {
        query.then((userNote) => {
            res.status(200).json(userNote);
        });
    }
    catch (error) {
        res.status(500).json({ err: "Could not get user data" });
    }
});
exports.noteRouter.delete("/remove-note", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, idx } = req.body;
    yield helper.deleteNote(name, idx);
    res.send({ success: true, message: "Note deleted successfully" });
}));
exports.noteRouter.post("/notes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, category, body } = req.body;
    const note = {
        title,
        category,
        body,
    };
    yield helper.createNote(req.user.name, note);
    res.send({ success: true });
}));
exports.noteRouter.put("/edit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Update a note
    const { name, title, body } = req.body;
    const updatedNote = yield helper.updateNote(title, name, body);
    if (updatedNote) {
        res.json({
            success: true,
            message: `Note with the title ${title} changed successfully`,
        });
    }
    else
        res.status(500).json({ success: false, err: "No such note found in the database" });
}));
//# sourceMappingURL=notes.js.map