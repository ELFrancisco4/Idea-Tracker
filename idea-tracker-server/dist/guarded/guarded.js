"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardedRouter = void 0;
const express_1 = require("express");
const notes_1 = require("./notes");
const user_1 = require("./user");
exports.guardedRouter = (0, express_1.Router)();
exports.guardedRouter.use((req, res, next) => {
    if (!req.session || !req.user)
        res.status(401).json({ message: "Unauthorized" });
    else
        next();
});
exports.guardedRouter.use(notes_1.noteRouter);
exports.guardedRouter.use(user_1.guardedUserRouter);
//# sourceMappingURL=guarded.js.map