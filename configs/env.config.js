// configs/env.config.js
import { str, cleanEnv, port } from "envalid";

const envVariables = process.env;

const env = cleanEnv(envVariables, {
    //Server Config
    PORT: port(),
    NODE_ENV: str({ choices: ["development", "production"], default: "development" }),
    MONGODB_URI: str(),

    // JWT Config
    ACCESS_TOKEN_SECRET: str(),
    ACCESS_TOKEN_EXPIRY: str(),

    // CORS Config
    CORS_ORIGIN: str(),
    CORS_ALLOWED_HEADERS: str(),

    // ADMIN User Config
    // ADMIN_NAME: str(),
    // ADMIN_USERID: str(),
    // ADMIN_EMAIL: str(),

    // Email Config
    // MAIL_HOST: str(),
    // MAIL_PORT: num(),
    // MAIL_USER: str(),
    // MAIL_PASS: str(),
    // MAIL_FROM_ADDRESS: str(),
});

export default env;
