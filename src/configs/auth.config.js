require('dotenv').config()

const secretKey = process.env.ACCESS_TOKEN_SECRET

// Fail fast: signing/verifying JWTs with a missing secret is never valid
if (!secretKey) {
  throw new Error('ACCESS_TOKEN_SECRET is not set. Refusing to start without a JWT secret.')
}
if (secretKey.length < 32) {
  console.warn('WARNING: ACCESS_TOKEN_SECRET is shorter than 32 characters. Use a long random secret.')
}

module.exports = {
  secretKey
}
