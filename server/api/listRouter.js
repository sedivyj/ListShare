// Router for handling API calls for editing lists
import Express from 'express'
import { getDb } from '../db/db.js' 

const router = new Express.Router()

// Add another item to a list
router.put('/addListItem', (req, res) => {

})

// Update an item in a list
router.post('/updateListItem', (req, res) => {
  
})

// Remove an item in a list
router.delete('/removeListItem', (req, res) => {
  
})


export default router