// Router for handling requests when user is at the start of project
import Express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = new Express.Router()

/**
 * TODO
 * Create route that generates a UUID and sends it to the client
 * Create route that takes the UUID, validates it, and sends to a mongoDB to store it
 * 
 */

router.get('/getID', (req, res) => {
  const randomUUID = uuidv4()
  const response = {
    uuid: randomUUID
  }
  res.status(200).json(response)
})

router.post('/newList', (req, res) => {
  const body = req.body
  if (body) {
    const uuid = body.uuid
    const password = body.uuid
  } else {
    const err = { message: 'Bad Body' }
    res.status(400).json(err)
  }
})

export default router
