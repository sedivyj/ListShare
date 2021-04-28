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
       listData: []
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
     res.status(200).json({listData: []})
    }
  } else {
    const err = { message: 'Bad Body' }
    res.status(400).json(err)
  }
})

// TODO: return a list
// TODO: handle case where password matches as well
// Return a potential list
router.post('/returnToList', async (req, res) => {
  const body = req.body
  if (body) {
    // Get values from body (password should be hashed)
    const uuid = body.uuid
    const hashPass = createHash('sha256').update(body.password).digest('hex')

    const query = { uuid: uuid }
    console.log(query)

    try {
      // Search Mongo for a document that matches the uuid and hashed password
      // Get DB connection object
      const db = getDb()
      // Find One document that matches the uuid
      const listDetails = await db.collection('list-data').findOne(query)
      // Check if defined -> null if nothing found
      if (listDetails) {
        console.log(listDetails)
        res.status(200).json({ listData: listDetails.listData})
      } else {
        res.status(400).json({message: 'List with that uuid not found!'})
      }
    } catch(err) {
      res.status(400).json({message: 'Unexpected error fetching list'})
    }
  } else {
    res.status(400).json({message: 'Bad body!'})
  }
})


export default router
