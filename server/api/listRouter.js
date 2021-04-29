// Router for handling API calls for editing lists
import Express from 'express'
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

// Update an item in a list
router.post('/updateListItem', (req, res) => {
  const body = req.body
  if (body) {
    res.status(200).json({ message: 'ITEM ADDED'})
  } else {
    res.status(400).json({ message: 'Bad Body' })
  }
})

// Remove an item in a list
router.delete('/removeListItem', (req, res) => {
  const body = req.body
  if (body) {
    res.status(200).json({ message: 'ITEM ADDED'})
  } else {
    res.status(400).json({ message: 'Bad Body' })
  }
})


export default router