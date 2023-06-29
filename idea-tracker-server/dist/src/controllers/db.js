"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectToDb = () => {
    mongoose_1.default.set('strictQuery', false);
    return mongoose_1.default
        .connect(process.env.MONGO_URI)
        .then(() => {
        console.log('Connected to mongodb');
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.connectToDb = connectToDb;
//# sourceMappingURL=db.js.map