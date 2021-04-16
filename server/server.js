import Express from 'express'

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

// Starting Server
app.listen(port, ()=> {
  console.log(`Server listening on port ${port}`)
})
