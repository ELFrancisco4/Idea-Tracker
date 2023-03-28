import { Router, Request, Response } from 'express'

import * as helper from '../controllers/helpers'

export const noteRouter = Router()

noteRouter.get('/notes', (req: Request, res: Response) => {
  console.log(req.user)

  const query = helper.viewAllNotes()
  try {
    query.then((userNotes) => {
      res.status(200).json(userNotes)
    })
  } catch (error) {
    res.status(500).json({ err: 'Could not get user data' })
  }
})

noteRouter.get('/notes/:id', (req: Request, res: Response) => {
  const { title } = req.body
  const id = parseInt(req.params.id)
  const query = helper.viewOneNote(title, id)
  try {
    query.then((userNote) => {
      res.status(200).json(userNote)
    })
  } catch (error) {
    res.status(500).json({ err: 'Could not get user data' })
  }
})

noteRouter.delete('/remove-note', async (req, res) => {
  const { name, id } = req.body

  await helper.deleteNote(name, id)

  res.status(200).send('Note deleted successfully')
})

noteRouter.post('/new', async (req, res) => {
  const { title, category, body, name } = req.body
  const note = {
    title,
    category,
    body,
  }
  await helper.createNote(name, note)
  res.status(200).send('Note created successfully')
})

noteRouter.put('/edit/:id', (req, res) => {
  const { title } = req.body
  const id = parseInt(req.params.id)
})
