"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Provide a name'],
    },
    password: {
        type: String,
        required: [true, 'Must provide a password'],
    },
    email: {
        type: String,
        required: [true, 'Must provide an email'],
    },
    notes: [
        {
            title: {
                type: String,
                required: [true, 'Title property is required'],
            },
            category: {
                type: String,
            },
            body: {
                type: String,
                required: [true, 'Must provide a body for your notes'],
            },
        },
    ],
});
exports.UserModel = mongoose_1.default.model('users', UserSchema);
//# sourceMappingURL=users.js.map