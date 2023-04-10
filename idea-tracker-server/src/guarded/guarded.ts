import {
  Router,
  Request as ExpressRequest,
  Response,
  NextFunction,
} from "express";
import passport from "passport";
import { noteRouter } from "./notes";
import { guardedUserRouter } from "./user";

export const guardedRouter = Router();
interface Request extends ExpressRequest {
  user: {
    name: string;
    notes: string[];
  };
  session;
}

guardedRouter.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.user)
    res.status(401).json({ message: "Unauthorized" });
  else next();
});

guardedRouter.use(noteRouter);
guardedRouter.use(guardedUserRouter);
