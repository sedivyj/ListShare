// Router for handling requests when user is at the start of project
import Express from 'express'
import assert from 'assert'
import { createHash } from 'crypto'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'
import { getDb } from '../db/db.js'

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



// Add a hashing for passwords
// Implement DB actions
router.put('/createList', (req, res) => {
  // Validate inputs
  // - validate that uuid is a valid uuid

  const body = req.body
  if (body) {
    const uuid = body.uuid
    const password = body.password

    if(uuidValidate(uuid)) {
      const hashPass = createHash('sha256').update(password).digest('hex')
     // Hash and Store credentials to DB
     console.log(`UUID: ${uuid}`)
     console.log(`PASSWORD: ${hashPass}`)

     const newList = {
       uuid: uuid,
       password: hashPass,
       name: 'Click me to change the list name!',
       listItems: []
     }

     // Get DB connection object
     const db = getDb()
     // Insert one cred
     db.collection('list-data').insertOne(newList, (err, result) => {
      if(err) {
        const error = {message: 'Something went wrong while inserting'}
        res.status(500).json(error)
      }
      console.log('item inserted')
     })

     const listData = []
     return res.status(200).json({listData: []})
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
    // Get values from body (password should be hashed)
    const uuid = body.uuid

    const query = { 
      uuid: uuid
    }
    // Determines what does/doesn't get returned from query
    // We don't want to have the password returned to user
    const projection = { password: 0 }
    console.log(query)

    try {
      // Search Mongo for a document that matches the uuid and hashed password
      // Get DB connection object
      const db = getDb()
      // Find One document that matches the uuid
      const listDataResult = await db.collection('list-data').findOne(query, projection)
      // Check if defined -> null if nothing found
      if (listDataResult) {
        console.log(listDataResult)
        res.status(200).json(listDataResult)
      } else {
        return res.status(400).json({message: 'List with that uuid and/or password was not found!'})
      }
    } catch(err) {
      return res.status(400).json({message: 'Unexpected error fetching list'})
    }
  } else {
    return res.status(400).json({message: 'Bad body!'})
  }
})

// TODO: return a list
// TODO: handle case where password matches as well
// Return a potential list based on uuid and password
router.post('/returnToEditList', async (req, res) => {
  const body = req.body
  if (body) {
    // Get values from body (password should be hashed)
    const uuid = body.uuid
    const hashPass = createHash('sha256').update(body.password).digest('hex')

    const query = { 
      uuid: uuid,
      password: hashPass
    }
    console.log(query)

    try {
      // Search Mongo for a document that matches the uuid and hashed password
      // Get DB connection object
      const db = getDb()
      // Find One document that matches the uuid
      const listDataResult = await db.collection('list-data').findOne(query)
      // Check if defined -> null if nothing found
      if (listDataResult) {
        console.log(listDataResult)
        return res.status(200).json(listDataResult)
      } else {
        return res.status(400).json({message: 'List with that uuid not found!'})
      }
    } catch(err) {
      return res.status(400).json({message: 'Unexpected error fetching list'})
    }
  } else {
    return res.status(400).json({message: 'Bad body!'})
  }
})


export default router
