const authController = require('../controllers/auth.controller')

module.exports = function (app) {
    /* ------ USER SIGNUP -------- */
    app.post('/api/auth/signup', authController.signup)
    /* ------ USER SIGNIN -------- */
    // Input validation lives in the controller (Joi); the old per-field DB-lookup
    // middlewares leaked which userIds exist and weren't type-safe.
    app.post('/api/auth/signin', authController.signin)
}
