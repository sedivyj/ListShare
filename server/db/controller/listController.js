import { getDb } from '../db.js'

/**
 * DB function that updates a list in the collection
 * @param {string} uuid unique identifier of a list
 * @param {string} hashPass hashed password that user inputted
 * @param {string} name name of the list
 * @param {array} listItems items of the list
 * @returns result of promise
 */
function updateList (uuid, hashPass, name, listItems) {
  // Get DB connection object
  const db = getDb()

  return new Promise((resolve, reject) => {
      // Set up query
      const query = { 
        uuid: uuid,
        password: hashPass
      }
      // Set up update
      const update = {
        $set: {
          name: name,
          listItems: listItems
        }
      }

      // Query and update the specified document
      db.collection('list-data').updateOne(query, update, (err) => {
        console.log('UPDATE LIST')
        // Check for errors
        if (err) {
          console.log(err)
          const error = {
            internalError: true, 
            message: 'Unexpected error updating list' 
          }
          return reject(error)
        } else {
          const result = { message: 'Update successful!'}
          return resolve(result)
        }
    })
  })
}

/**
 * DB function that deletes a list in the collection
 * @param {string} uuid unique identifier of a list
 * @param {string} hashPass hashed password that user inputted
 * @returns result of promise
 */
function deleteList (uuid, hashPass) {
  // Get DB connection object
  const db = getDb()

  return new Promise((resolve, reject) => {
    // Set up query
    const query = { 
      uuid: uuid,
      password: hashPass
    }

    // Delete the specified document
    db.collection('list-data').deleteOne(query, (err) => {
      console.log('DELETE LIST')
      // Check for errors
      if (err) {
        console.log(err)
        const error = {
          internalError: true, 
          message: 'Unexpected error fetching list' 
        }
        return reject(error)
      } else {
        const result = { message: 'Delete successful!' }
        return resolve(result)
      }
    })
  })
}

module.exports = {
  updateList,
  deleteList
}