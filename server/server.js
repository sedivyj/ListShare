import Express from 'express'

const app = new Express()
const port = 8080

// Logging all incoming request
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.path}`)
  next()
})

// Serve static files from public folder
app.use(Express.static('public'))

// Starting Server
app.listen(port, ()=> {
  console.log(`Server listening on port ${port}`)
})
