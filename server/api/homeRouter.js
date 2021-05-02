// Router for handling requests when user is at the start of project
import Express from 'express'
import assert from 'assert'
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



// Add a hashing for passwords
// Implement DB actions
router.put('/createList', (req, res) => {
  const body = req.body
  if (body) {
    const uuid = body.uuid
    const password = body.password

    if(uuidValidate(uuid)) {
      const hashPass = createHash('sha256').update(password).digest('hex')

      // Insert new list with uuid and hashed password
      MONGO_DB_HOME.createList(uuid, hashPass)
      .then((result) => {
        return res.status(200).json(result)
      })
      .catch((err) => {
        return res.status(500).json(err)
      })

    } else {
      return res.status(400).json({ message: 'Invalid UUID' })
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
    
    // Make sure uuid is a valid one
    if(uuidValidate(uuid)) {
      MONGO_DB_HOME.getViewList(query)
      .then((result) => {
        return res.status(200).json(result)
      })
      .catch((err) => {
        // Check for an internal error
        if (err.internalErr) { return res.status(500).json(err) }
        return res.status(400).json(err)
      })
    } else {
      return res.status(400).json({message: 'Not a valid UUID'})
    }
  } else {
    return res.status(400).json({message: 'Bad body!'})
  }
})

// Return a potential list based on uuid and password
router.post('/returnToEditList', async (req, res) => {
  const body = req.body
  if (body) {
    // Get values from body (password should be hashed)
    const uuid = body.uuid
    if(uuidValidate(uuid)) {
      const hashPass = createHash('sha256').update(body.password).digest('hex')

      MONGO_DB_HOME.getEditList(uuid, hashPass)
      .then((result) => {
        return res.status(200).json(result)
      })
      .catch((err) => {
        // Check for an internal error
        if (err.internalErr) { return res.status(500).json(err) }
        return res.status(400).json(err)
      })

    } else {
      return res.status(400).json({message: 'Not a valid UUID'})
    }
  } else {
    return res.status(400).json({message: 'Bad body!'})
  }
})


export default router
