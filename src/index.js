const express = require('express');
const serverless = require("serverless-http");
const app = express();
const mongoose = require('mongoose')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const { DB_URL } = require('./configs/db.config')
const PORT = process.env.PORT || 8001

app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.json({ limit: '16kb' })) // parse JSON data & add it to the request.body object
app.use(logger('dev'))
app.use(cookieParser())

mongoose.connect(DB_URL)
// FIRST CONNECT TO MONGODB THEN START LISTENING TO REQUESTS
.then((connect) => {
    console.log(`MongoDB Connected to Host: ${connect.connection.host}`)
    app.listen(PORT, () => {
      console.log(`Listening all requests on port ${PORT}`)
    })
  })
// IF DB CONNECT FAILED, CATCH ERROR
  .catch((error) => {
    console.log("Can't connect to DB:", error.message)
  })

const authRoutes = require('./routes/auth.routes')
const bookRoutes = require('./routes/book.routes')
authRoutes(app)
bookRoutes(app)


app.get('/health', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'Backend is up and running!'
  })
})


app.use("*", (req, res) => {
  res.json({
    success: false,
    message: 'Requested resource not found',
    requestURL: req.originalUrl,
    statusCode: 404
  })
})

module.exports.handler = serverless(app)





