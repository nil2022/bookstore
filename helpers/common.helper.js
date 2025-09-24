// helpers/common.helper.js
import Books from "#models/books";

export async function findOneBook(id) {
    const book = await Books.findOne({
        _id: id,
    });
    if (!book) {
        res.status(403).send("Book does not exists in server");
        return;
    } else return book;
}
