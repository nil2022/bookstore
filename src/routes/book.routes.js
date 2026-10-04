const bookController = require('../controllers/books.controller')
const validateBookDetails = require('../middlewares/validateBookDetails')
const authjwt = require('../middlewares/auth.jwt')
const { authorizeRoles } = require('../middlewares/authorize')
const { ROLES } = require('../configs/roles.config')

module.exports = function (app) {
    /* Read endpoints: any signed-in user. Write endpoints (add/update/delete): admin only. */
    /* ----- ADD A BOOK API -------- */
    app.post('/api/book/add', [authjwt.verifyToken, authorizeRoles(ROLES.ADMIN), validateBookDetails.isBookDetailsProvided], bookController.addOneBook)
    /* ----- VIEW A LIST OF ALL BOOKS API -------- */
    app.get('/api/book/viewall', [authjwt.verifyToken], bookController.fetchAllBooks)
    /* ----- VIEW A BOOK BY ID API -------- */
    app.get('/api/book/viewbyid', [authjwt.verifyToken, validateBookDetails.isValidBookId], bookController.fetchById)
    /* ----- UPDATE A BOOK API -------- */
    app.patch('/api/book/updatebook', [authjwt.verifyToken, authorizeRoles(ROLES.ADMIN), validateBookDetails.isValidBookId, validateBookDetails.isBookPresent], bookController.updateBook)
    /* ----- DELETE A BOOK API -------- */
    app.delete('/api/book/deletebook', [authjwt.verifyToken, authorizeRoles(ROLES.ADMIN), validateBookDetails.isValidBookId, validateBookDetails.isBookPresent], bookController.deleteBook)
}
