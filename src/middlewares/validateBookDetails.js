const Books = require('../models/book.model')
const { bookValidation } = require('../helpers/validation')

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i

/* To validate whether all details of book is given (and are of the right type) or not  */
const isBookDetailsProvided = async (req, res, next) => {
    const { error, value } = bookValidation.validate(req.body)

    if(error) {
        console.log("Book details missing/invalid:", error.details[0].message)
        // JSON (not text/html): the message can contain user-supplied text
        res.status(403).json({ message: `Some details are missing or invalid! ${error.details[0].message}` })
        return
    }
    req.body = value // only validated, correctly typed fields reach the controller
    next()
}

/* To check the book id is a plain 24-char hex string, never an object like ?id[$ne]=x (NoSQL injection) */
const isValidBookId = (req, res, next) => {
    const id = req.query.id

    if(typeof id !== 'string' || !OBJECT_ID_REGEX.test(id)) {
        res.status(400).send("Either Book id not provided or incorrect id provided")
        return
    }
    next()
}

/* To check whether book is present in server or not */
const isBookPresent = async (req, res, next) => {
    const id = req.query.id;

    try {
        const book = await Books.findOne({
            _id: { $eq: id }
        })
        if(!book) {
            res.status(403).send("Book does not exists in server")
            return
        }
        else next();
    } catch (error) {
        console.log("Error while checking book:", error.message)
        res.status(500).send({
            message: "Some internal error occured"
        })
    }
}

module.exports = {
    isBookDetailsProvided,
    isValidBookId,
    isBookPresent
}
