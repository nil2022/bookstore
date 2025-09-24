// controllers/auth.controller.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "#models/user";
import { userRegistrationValidation } from "#helpers/validation";
import env from "#configs/env";

/* -------- SIGNUP API----------- */
export const signup = async (req, res) => {
    const { username, userId, password, email } = req.body;

    const { error } = userRegistrationValidation.validate(req.body);
    if (error)
        return res.status(400).json({
            status: false,
            message: error.details[0].message,
        });

    const salt = await bcrypt.genSalt(12); // Salt generate to Hash Password

    const userObj = {
        username: username,
        userId: userId,
        password: bcrypt.hashSync(password, salt),
        email: email,
    };

    try {
        const userCreated = await User.create(userObj);
        const postResponse = {
            name: userCreated.username,
            userId: userCreated.userId,
            email: userCreated.email,
            createdAt: userCreated.createdAt,
        };
        console.log({
            Message: "User Created Successfully",
            Response: postResponse,
        });
        res.status(201).send({
            Message: "User Registered Success",
            UserData: postResponse,
        });
    } catch (error) {
        console.log("Something went wrong while saving to DB", `${error.name}:${error.message}`);
        res.status(500).send({
            message: "Some internal error while inserting the element",
        });
    }
};

/* -------- SIGNIN API----------- */
export const signin = async (req, res) => {
    const user = await User.findOne({ userId: req.body.userId });
    console.log("Signin Request for ", user);

    if (!user) {
        res.status(400).send("Failed! UserId doesn't exist!");
        return;
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
        console.log("Invalid Password!");
        res.status(401).send("Invalid Password!");
        return;
    }
    const token = jwt.sign({ userId: user.userId }, env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "7d", // 7 Days
    });

    const signInResponse = {
        name: user.username,
        userId: user.userId,
        email: user.email,
        accessToken: token,
    };

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };
    res.status(201).cookie("accessToken", token, cookieOptions).json({
        message: "Signed in successfully!",
        Response: signInResponse,
    });
};
