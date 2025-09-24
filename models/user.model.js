// models/users.model.js
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Not Provided"],
        },
        userId: {
            type: String,
            required: [true, "Not Provided"],
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Not Provided"],
        },
        email: {
            type: String,
            required: [true, "Not Provided"],
            lowercase: true,
            unique: true,
        },
    },
    {
        timestamps: true,
        collection: "users",
    }
);

const User = mongoose.model("User", userSchema);

export default User;
