import { Router } from 'express'

export const homeRouter = Router()

homeRouter.get('/', async (req, res) => {
  res.status(200).json({ message: 'Welcome to the notes app' })
})
