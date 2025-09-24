// routes/auth.routes.js
import authController from "#controllers/auth";
import {
    isUserIdRegisteredOrProvided,
    isEmailRegisteredOrProvided,
    isPasswordProvided,
    isUserIdProvided,
} from "#middlwares/validateUser";

module.exports = function (app) {
    /* ------ USER SIGNUP -------- */
    app.post("/api/auth/signup", authController.signup);
    /* ------ USER SIGNIN -------- */
    app.post("/api/auth/signin", [isUserIdProvided, isPasswordProvided], authController.signin);
};
