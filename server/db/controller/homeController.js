import { getDb } from '../db.js'

/**
 * DB function that inserts a new list into collection
 * @param {object} newList new List to create for the user
 * @returns result of promise
 */
function createList (uuid, hashPass) {
  // Get DB connection object
  const db = getDb()

  return new Promise((resolve, reject) => {
    // Create default insert of list object
    const newList = {
      uuid: uuid,
      password: hashPass,
      name: 'Click me to change the list name!',
      listItems: []
    }

    // Insert one cred
    db.collection('list-data').insertOne(newList, (err) => {
      console.log('CREATE LIST')
      if(err) {
        const error = { message: 'Something went wrong while inserting' }
        return reject(error)
      }
      // User has password locally, don't need to send it back
      newList.password = ''
      return resolve(newList)
    })
  })
}

/**
 * DB function that inserts a new list into collection
 * @param {object} newList new List to create for the user
 * @returns result of promise
 */
function getViewList (uuid) {
  // Get DB connection object
  const db = getDb()

  return new Promise((resolve, reject) => {
    // Set up query
    const query = { 
      uuid: uuid
    }
      // Determines what does/doesn't get returned from query
      // We don't want to have the _id and password returned to user
      const project = { 
        projection: { _id: 0, password: 0 } 
      }

      // Find One document that matches the uuid
      db.collection('list-data').findOne(query, project, (err, result) => {
        console.log('GET VIEW LIST')
        // Check for errors
        if (err) {
          console.log(err)
          const error = {
            internalError: true, 
            message: 'Unexpected error fetching list' 
          }
          return reject(error)
        }
        // result will be null if nothing is found
        if (!result) {
          const error = {
            internalError: false,
            message: 'List with that uuid was not found!' 
          }
          return reject(error)
        } else {
          return resolve(result)
        }
      })
  })
}

/**
 * DB function that finds document that matches uuid and hashed password
 * @param {object} newList new List to create for the user
 * @returns result of promise
 */
function getEditList (uuid, hashPass) {
  // Get DB connection object
  const db = getDb()

  return new Promise((resolve, reject) => {
    // Set up query
    const query = { 
      uuid: uuid,
      password: hashPass
    }
    // Determines what does/doesn't get returned from query
    // We don't want to have the _id and password returned to user
    const project = { 
      projection: { _id: 0, password: 0 } 
    }

    db.collection('list-data').findOne(query, project, (err, result) => {
      console.log('GET EDIT LIST')
      // Check for errors
      if (err) {
        console.log(err)
        const error = { 
          internalError: true,
          message: 'Unexpected error fetching list'
        }
        return reject(error)
      }
      // result will be null if nothing is found
      if (!result) {
        const error = {
          internalError: false,
          message: 'List with that uuid and/or password was not found!' 
        }
        return reject(error)
      } else {
        return resolve(result)
      }
    })
  })
}

module.exports = {
  createList,
  getViewList,
  getEditList
}