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
        },
        password: {
            type: String,
            required: [true, "Not Provided"],
        },
        email: {
            type: String,
            required: [true, "Not Provided"],
            lowercase: true,
        },
    },
    {
        timestamps: true,
        collection: "users",
    }
);

// Create index to avoid duplicate userId and email
userSchema.index({ userId: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

export default User;
