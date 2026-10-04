const express = require('express');
const serverless = require("serverless-http");
const app = express();
const mongoose = require('mongoose')
const logger = require('morgan')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { DB_URL } = require('./configs/db.config')
const PORT = process.env.PORT || 8001

// Defense in depth against NoSQL injection: any `{ $op: ... }` object that reaches a
// query filter is wrapped in `$eq` instead of being executed as an operator
mongoose.set('sanitizeFilter', true)

// Behind a proxy/CDN (e.g. Netlify) set TRUST_PROXY to the number of hops so rate limiting sees the real client IP
if (process.env.TRUST_PROXY) {
  app.set('trust proxy', Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY)
}

app.use(helmet()) // secure headers, also removes `X-Powered-By`

const rateLimitMessage = { success: false, message: 'Too many requests, please try again later' }
// Strict limit on signup/signin to slow down brute force & credential stuffing
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false, message: rateLimitMessage }))
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false, message: rateLimitMessage }))

app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.json({ limit: '16kb' })) // parse JSON data & add it to the request.body object
app.use(logger('dev'))

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

// Central error handler: no stack traces / internals leaked to the client
// (e.g. malformed JSON bodies, oversized payloads, any error passed to next(err))
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Malformed request body' })
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ success: false, message: 'Request body too large' })
  }
  console.log('Unhandled error:', err.message)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

module.exports.handler = serverless(app)





