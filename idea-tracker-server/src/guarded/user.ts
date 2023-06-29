import { Router, Request, Response } from 'express'

import * as helper from '../controllers/helpers'

export const guardedUserRouter = Router()

guardedUserRouter.get('/home', async (req, res) => {
  const { name } = req.body
  const user = await helper.getUser(name)
  res.send(user)
})

guardedUserRouter.delete('/home', async (req, res) => {
  const { name } = req.body
  await helper.deleteUser(name)
  res.send(`User ${name} has been deleted`)
})
