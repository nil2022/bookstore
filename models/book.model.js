// models/book.model.js
import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Not Provided"],
            unique: true,
        },
        author: {
            type: String,
            required: [true, "Not Provided"],
        },
        isbn: {
            type: String,
            required: [true, "Not Provided"],
            unique: true,
        },
        publisher: {
            type: String,
            required: [true, "Not Provided"],
        },
        price: {
            type: Number,
        },
        language: {
            type: String,
            required: [true, "Not Provided"],
        },
    },
    {
        timestamps: true,
        collection: "books",
    }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
