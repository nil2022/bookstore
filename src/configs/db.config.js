require("dotenv").config(); // import all environment variables

const DB_URL = process.env.DB_URL;

module.exports = {
    DB_URL,
};
