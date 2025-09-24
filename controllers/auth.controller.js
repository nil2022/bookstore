// controllers/auth.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '#models/user';
import { userRegistrationValidation } from '#helpers/validation';
import env from '#configs/env';

/* -------- SIGNUP API----------- */
export const createUser = async (payload) => {
    const { error } = userRegistrationValidation.validate(payload);
    if (error) throw new Error(error.details[0].message);

    const { username, userId, password, email } = payload;

    // check exiting user using email and userId
    const existingUser = await User.findOne({ $or: [{ userId: userId }, { email: email }] });
    if (existingUser) {
        return {
            status: false,
            message: 'UserId or Email already registered!',
        };
    }

    const salt = await bcrypt.genSalt(12); // Salt generate to Hash Password

    const userObj = {
        username: username,
        userId: userId,
        password: bcrypt.hashSync(password, salt),
        email: email,
    };

    const userCreated = await User.create(userObj);
    const postResponse = {
        name: userCreated.username,
        userId: userCreated.userId,
        email: userCreated.email,
        createdAt: userCreated.createdAt,
    };
    return {
        message: 'User Registered Successfully!',
        data: postResponse,
    };
};

/* -------- SIGNIN API----------- */
export const userLogin = async (payload) => {
    const { userId, password } = payload;
    const user = await User.findOne({ userId }).select('+password');

    if (!user) {
        return {
            status: false,
            message: "UserId doesn't exist!",
        };
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
        console.log('Invalid Password!');
        return {
            status: false,
            message: 'Invalid Password!',
        };
    }
    const token = jwt.sign(
        {
            _id: user._id,
            userId: user.userId,
            email: user.email,
        },
        env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: env.ACCESS_TOKEN_EXPIRY,
        }
    );

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
    return {
        status: true,
        message: 'Login Successfull',
        data: signInResponse,
    };
};
