import { Router } from 'express'
import passport from 'passport'
import { noteRouter } from './notes'
import { guardedUserRouter } from './user'

export const guardedRouter = Router()

// All routes will need auth to work
// You can access the user from:
// req.user (type-safe)
// OR
// req.session.passport.user (not type-safe)
// Check notes.ts:8
guardedRouter.use(passport.authenticate('local'))

guardedRouter.use(noteRouter)
guardedRouter.use(guardedUserRouter)
