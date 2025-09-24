// middlewares/validateBookDetails.middleware.js
import Books from "#models/book";

/* To validate whether all details of book is given not  */
export const isBookDetailsProvided = async (req, res, next) => {
    const { title, author, ISBN, publisher, price, language } = req.body;

    if (!title || !author || !ISBN || !publisher || !price || !language) {
        console.log("All Details are not provided");
        res.status(403).send("Some details are missing! Please re-check");
        return;
    } else next();
};

/* To check whether book is present in server or not */
export const isBookPresent = async (req, res, next) => {
    const id = req.query.id;

    const book = await Books.findOne({
        _id: id,
    });
    if (!book) {
        res.status(403).send("Book does not exists in server");
        return;
    } else next();
};
