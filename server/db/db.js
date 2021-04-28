// Establishes DB Connection to MONGO
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import assert from 'assert'

// Config ENV Variables
dotenv.config()

let _db
const uri = process.env.MONGO_URI

/**
 * Function that initializes connection to MongoDB server
 * @param {function} callback callback function to run when finished
 * @returns 
 */
async function initDb (callback) {
  // Check if DB is already connected
  if (_db) {
    console.warn('Trying to init db connection again!')
    return callback(null, _db)
  }

  // Check if URI connection string is defined
  if (!uri) { throw Error('Invalid DB URI. Did you set up your .env file?') }

  // Create client and establish a connection to DB server
  const client = new MongoClient(uri)
  await client.connect((err) => {
    assert.strictEqual(null, err)
    console.log('Connected successfully to server!')

    _db = client.db()
  })

  return callback(null, _db)
}

/**
 * Checks if the db connection is established and returns it
 * @returns db connection object
 */
function getDb () {
  assert.ok(_db, 'Db has not been initialized. Please call initDb first')
  return _db
}

module.exports = {
  initDb,
  getDb
}
