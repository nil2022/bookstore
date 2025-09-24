// routes/book.routes.js
import Router from "express";
import { addOneBook, deleteBook, fetchAllBooks, fetchById, updateBook } from "#controllers/books";
import { isBookDetailsProvided, isBookPresent } from "#middlewares/validateBookDetails";
import { verifyToken } from "#middlewares/auth";

const bookRouter = Router();

bookRouter.route("/add").post([verifyToken, isBookDetailsProvided], addOneBook);
bookRouter.route("/viewall").get([verifyToken], fetchAllBooks);
bookRouter.route("/viewbyid").get([verifyToken], fetchById);
bookRouter.route("/updatebook").patch([verifyToken, isBookPresent], updateBook);
bookRouter.route("/deletebook").delete([verifyToken, isBookPresent], deleteBook);

export default bookRouter;
