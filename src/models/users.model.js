const mongoose = require("mongoose");
const { ROLES, ROLE_VALUES } = require("../configs/roles.config");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Not Provided"]
  },
  userId: {
    type: String,
    required: [true, "Not Provided"],
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Not Provided"],
  },
  email: {
    type: String,
    required: [true, "Not Provided"],
    lowercase: true,
    unique: true
  },
  role: {
    type: String,
    enum: ROLE_VALUES,
    default: ROLES.USER
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
