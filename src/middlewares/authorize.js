const User = require('../models/users.model')
const { ROLES } = require('../configs/roles.config')

/*
 * Role check, to be used AFTER verifyToken.
 * The role is read from the DB on every request (not from the JWT), so promotions, demotions
 * and deleted accounts take effect immediately instead of when the token expires.
 */
const authorizeRoles = (...allowedRoles) => async (req, res, next) => {
  try {
    const user = await User.findOne({ userId: { $eq: req.userId } }).select('role')

    // Valid token, but the account no longer exists
    if (!user) {
      return res.status(401).send({
        message: 'Unauthorized!'
      })
    }

    const role = user.role ?? ROLES.USER // accounts created before roles existed are regular users
    if (!allowedRoles.includes(role)) {
      console.log(`Forbidden: '${req.userId}' (${role}) tried to access ${req.method} ${req.originalUrl}`)
      return res.status(403).send({
        message: 'Forbidden: you do not have permission to perform this action'
      })
    }

    req.userRole = role
    next()
  } catch (error) {
    console.log('Error while checking role:', error.message)
    res.status(500).send({
      message: 'Some internal error occured'
    })
  }
}

module.exports = {
  authorizeRoles
}
