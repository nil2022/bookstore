// configs/app.config.js
import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import router from "#root/routes/index";

const app = express();
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" })); // parse JSON data & add it to the request.body object
app.use(logger("dev"));
app.use(cookieParser());

// import all routes here
app.use("/api/v1", router);

app.get("/", (req, res) => {
    res.status(200).send({
        success: true,
        message: "Backend is up and running!",
    });
});

export default app;
