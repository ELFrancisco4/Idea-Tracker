import { Router, Request as ExpressRequest, Response } from 'express'

import * as helper from '../controllers/helpers'

export const noteRouter = Router()

interface Request extends ExpressRequest {
  user: {
    name: string
    notes: string[]
  }
}

noteRouter.get('/notes', async (req: Request, res: Response) => {
  const notes = await helper.viewAllNotes(req.user.name)

  res.send(notes)
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
  const { name, idx } = req.body

  await helper.deleteNote(name, idx)

  res.send({ success: true, message: 'Note deleted successfully' })
})

noteRouter.post('/notes', async (req: Request, res) => {
  const { title, category, body } = req.body
  const note = {
    title,
    category,
    body,
  }

  await helper.createNote(req.user.name, note)
  res.send({ success: true })
})

noteRouter.put('/edit/:id', (req, res) => {
  const { title } = req.body
  const id = parseInt(req.params.id)
})
