// Router for handling API calls for editing lists
import Express from 'express'
import { createHash } from 'crypto'

import { getDb } from '../db/db.js' 

const router = new Express.Router()

// Add another item to a list
router.put('/addListItem', (req, res) => {
  const body = req.body
  if (body) {
    res.status(200).json({ message: 'ITEM ADDED'})
  } else {
    res.status(400).json({ message: 'Bad Body' })
  }
})

router.post('/updateName', async (res, req) => {
  const body = req.body
  if (body) {
    // Handle getting data from body
    try {
      const db = getDb()

    } catch (err) {

    }
    res.status(200).json({ message: 'ITEM ADDED'})
  } else {
    res.status(400).json({ message: 'Bad Body' })
  }
})

// Update an item in a list
router.post('/updateList', async (req, res) => {
const body = req.body
  if (body) {
    // Handle getting data from body
    const uuid = body.uuid
    const hashPass = createHash('sha256').update(body.password).digest('hex')
    const listItems = body.listItems

    const query = { 
      uuid: uuid,
      password: hashPass
    }
    const update = {
      $set: {
        listItems: listItems
      }
    }
    const db = getDb()
    db.collection('list-data').updateOne(query, update)
      .then((data) => {
        console.log(data)
        return res.status(200).json({ message: 'Update successful!'})
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ message: 'Something went wrong'})
      })
  } else {
    res.status(400).json({ message: 'Bad Body' })
  }
})

// Remove an item in a list
router.delete('/deleteList', (req, res) => {
  const body = req.body
  if (body) {
    // Handle getting data from body
    const uuid = body.uuid
    const hashPass = createHash('sha256').update(body.password).digest('hex')
    const listItems = body.listItems

    const query = { 
      uuid: uuid,
      password: hashPass
    }

    const db = getDb()
    db.collection('list-data').deleteOne(query)
    .then((data) => {
      console.log(data)
      return res.status(200).json({ message: 'Update successful!'})
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({ message: 'Something went wrong'})
    })
  } else {
    res.status(400).json({ message: 'Bad Body' })
  }
})


export default router