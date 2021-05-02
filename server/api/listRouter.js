// Router for handling API calls for editing lists
import Express from 'express'
import { createHash } from 'crypto'
import { validate as uuidValidate } from 'uuid'

import MONGO_DB_LIST from '../db/controller/listController.js'

const router = new Express.Router()

// Update an item in a list
router.post('/updateList', async (req, res) => {
const body = req.body
  if (body) {
    // Handle getting data from body
    const uuid = body.uuid
    // Validate uuid
    if (uuidValidate(uuid)) { 
      const hashPass = createHash('sha256').update(body.password).digest('hex')
      const name = body.name
      const listItems = body.listItems
  
      // Update list with these details
      MONGO_DB_LIST.updateList(uuid, hashPass, name, listItems)
        .then((result) => { return res.status(200).json(result) })
        .catch((err) => {
          // Check for an internal error
          if (err.internalErr) { return res.status(500).json(err) }
          return res.status(400).json(err)
        })
    } else {
      const err = { message: 'Invalid UUID' }
      return res.status(400).json(err)
    }
  } else {
    const err = { message: 'Bad Body' }
    return res.status(400).json(err)
  }
})

// Route that deletes an entire list
router.delete('/deleteList', (req, res) => {
  const body = req.body
  if (body) {
    // Getting data from the body
    const uuid = body.uuid
    // Validate uuid
    if (uuidValidate(uuid)) {
      // Get password and immediate hash it
      const hashPass = createHash('sha256').update(body.password).digest('hex')

      // Delete list with these details
      MONGO_DB_LIST.deleteList(uuid, hashPass)
        .then((result) => { return res.status(200).json(result) })
        .catch((err) => {
          // Check for an internal error
          if (err.internalErr) { return res.status(500).json(err) }
          return res.status(400).json(err)
        })
    } else {
      const err = { message: 'Invalid UUID' }
      return res.status(400).json(err)
    }
  } else {
    const err = { message: 'Bad Body' }
    return res.status(400).json(err)
  }
})


export default router