import { Router } from 'express'
import passport from 'passport'
import { noteRouter } from './notes'
import { guardedUserRouter } from './user'

export const guardedRouter = Router()

guardedRouter.use((req, res, next) => {
  if (!req.session || !req.user) res.status(401).json({ message: 'Unauthorized' })
  else next()
})

guardedRouter.use(noteRouter)
guardedRouter.use(guardedUserRouter)
