/*
 * Promote / demote a user (there is intentionally no HTTP endpoint for this).
 * Usage: npm run set-role -- <userId> <user|admin>
 */
require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../src/models/users.model')
const { ROLE_VALUES } = require('../src/configs/roles.config')

const [userId, role] = process.argv.slice(2)

const main = async () => {
  if (!userId || !ROLE_VALUES.includes(role)) {
    throw new Error(`Usage: npm run set-role -- <userId> <${ROLE_VALUES.join('|')}>`)
  }
  if (!process.env.DB_URL) throw new Error('DB_URL is not set')

  await mongoose.connect(process.env.DB_URL)
  const result = await User.updateOne(
    { userId: { $eq: userId.toLowerCase() } },
    { $set: { role } }
  )
  if (result.matchedCount === 0) throw new Error(`User '${userId}' not found`)
  console.log(`'${userId}' is now '${role}'`)
}

main()
  .catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect())
