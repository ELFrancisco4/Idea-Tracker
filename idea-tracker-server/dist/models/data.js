"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const NotesSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title property is required"],
    },
    category: {
        type: String,
    },
    body: {
        type: String,
        required: [true, "Must provide a body for your notes"],
    },
});
exports.NotesModel = mongoose_1.default.model("notes", NotesSchema);
//# sourceMappingURL=data.js.map