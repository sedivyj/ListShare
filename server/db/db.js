// Establishes DB Connection to MONGO
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Config ENV Variables
dotenv.config()

// Establish DB Connection
const uri = process.env.MONGO_URI
const db_client = new MongoClient(uri)
