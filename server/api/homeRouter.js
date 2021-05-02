// Router for handling requests when user is at the start of project
import Express from 'express'
import { createHash } from 'crypto'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'

import MONGO_DB_HOME from '../db/controller/homeController.js'

const router = new Express.Router()

// Route that returns a UUID
router.get('/getID', (req, res) => {
  const randomUUID = uuidv4()
  const response = {
    uuid: randomUUID
  }
  res.status(200).json(response)
})

// Route that creates a new list based on uuid and password
// Returns the default list when successful
router.put('/createList', (req, res) => {
  const body = req.body
  if (body) {
    const uuid = body.uuid
    // Validate uuid
    
    if(uuidValidate(uuid)) {
      const hashPass = createHash('sha256').update(body.password).digest('hex')

      // Insert new list with uuid and hashed password
      MONGO_DB_HOME.createList(uuid, hashPass)
      .then((result) => { return res.status(200).json(result) })
      .catch((err) => { return res.status(500).json(err) })
    } else {
      const err = { message: 'Invalid UUID' }
      return res.status(400).json(err)
    }
  } else {
    const err = { message: 'Bad Body' }
    return res.status(400).json(err)
  }
})

// Router for when user doesn't provide a password and just wants to view a list
router.post('/returnToViewList', async (req, res) => {
  const body = req.body
  if (body) {
    // Get values from body
    const uuid = body.uuid
    
    // Validate uuid
    if(uuidValidate(uuid)) {
      MONGO_DB_HOME.getViewList(uuid)
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

// Return a potential list based on uuid and password
router.post('/returnToEditList', async (req, res) => {
  const body = req.body
  if (body) {
    // Get values from body (password should be hashed)
    const uuid = body.uuid
    // Make sure uuid is valid
    if(uuidValidate(uuid)) {
      const hashPass = createHash('sha256').update(body.password).digest('hex')

      MONGO_DB_HOME.getEditList(uuid, hashPass)
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
