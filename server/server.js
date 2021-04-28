import Express from 'express'

import { initDb } from './db/db.js'

// Imported Custom Routers
import homeRouter from './api/homeRouter.js'

const app = new Express()
const port = 8080

// Middleware for Using JSON
app.use(Express.json())

// Logging all incoming request
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.path}`)
  next()
})

// Custom Routers
app.use('/home', homeRouter)

// Serve static files from public folder
app.use(Express.static('public'))

initDb((err) => {
  // Starting Server
  app.listen(port, (err1)=> {
    try {
      if (err) throw Error(err)
      if (err1) throw Error(err1)
      console.log(`Server listening on port ${port}`)
    } catch (err2) {
      console.error(`ERROR IN LISTEN\n${err2.stack}`)
    }
  })
})
