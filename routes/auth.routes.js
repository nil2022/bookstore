// routes/auth.routes.js
import Router from 'express';
import { isPasswordProvided, isUserIdProvided } from '#middlewares/validateUser';
import { createUser, userLogin } from '#controllers/auth';

const authRouter = Router();

authRouter.route('/signup').post(registerUser);
authRouter.route('/signin').post([isUserIdProvided, isPasswordProvided], login);

async function registerUser(req, res, next) {
    try {
        const payload = req?.body || {};
        const response = await createUser(payload);
        return res.status(201).json({
            status: response?.status || true,
            message: response?.message || 'User Created Successfully',
            data: response?.data || {},
        });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const payload = req?.body || {};
        const response = await userLogin(payload);
        return res.status(200).json({
            status: response?.status || true,
            message: response?.message || 'Login Successfull',
            data: response?.data || {},
        });
    } catch (error) {
        next(error);
    }
}

export default authRouter;
