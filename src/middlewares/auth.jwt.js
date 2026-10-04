const jwt = require('jsonwebtoken')
const authConfig = require('../configs/auth.config')

/* -------- CHECK IF TOKEN IS PROVIDED & VERIFY TOKEN ----------- */
const verifyToken = (req, res, next) => {
    // Header only: browsers never attach this automatically, so requests can't be forged cross-site
    const token = req.headers['token']

    if (!token || typeof token !== 'string') {
      return res.status(403).send({
        message: 'No token provided!'
      })
    }

    // Pin the algorithm so a forged token can't pick its own (e.g. 'none')
    jwt.verify(token, authConfig.secretKey, { algorithms: ['HS256'] }, (err, decoded) => {
      if (err) {
        console.log('Error with JWT -', err.message)
        return res.status(401).send({
          message: 'Unauthorized!'
        })
      }
      req.userId = decoded.userId
      next()
    })
  }

module.exports = {
    verifyToken
}
