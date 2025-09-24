// middlewares/auth.middleware.js
import env from "#configs/env";
import jwt from "jsonwebtoken";

/* -------- CHECK IF TOKEN IS PROVIDED & VERIFY TOKEN ----------- */
export const verifyToken = (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers["token"] || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }

    jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("Error with JWT -", err.message);
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.userId;
        next();
    });
};
