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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const passport = require("passport");
const cors = require("cors");
const express_session_1 = __importDefault(require("express-session"));
const db_1 = require("./controllers/db");
const home_1 = require("./home");
const user_1 = require("./user");
const guarded_1 = require("./guarded");
const auth_1 = require("./controllers/auth");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'none'
    }
}));
app.use(passport.initialize());
app.use(passport.session());
(0, auth_1.instantiateAuth)(passport);
app.use(home_1.homeRouter);
app.use(user_1.userRouter);
app.use(guarded_1.guardedRouter);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectToDb)();
    console.log(`App is listening on port ${PORT}`);
}));
//# sourceMappingURL=app.js.map