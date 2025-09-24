// server.js
import env from "#configs/env";
import connectDB from "#configs/db";
import app from "#configs/app";
const PORT = env.PORT || 8001;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening all requests on port ${PORT}`);
        });
    })
    // IF DB CONNECT FAILED, CATCH ERROR
    .catch((error) => {
        console.log("Can't connect to DB:", error.message);
    });
