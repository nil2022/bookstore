const Books = require('../models/book.model')

async function findOneBook (id) {
    const book = await Books.findOne({
        _id:id
    })
    if(!book) {
        res.status(403).send("Book does not exists in server")
        return
    }
    else return book;    
}

module.exports = {
    findOneBook
}


