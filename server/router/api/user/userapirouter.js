import express from 'express';
import userAuthRouter from './userauth/userauthrouter.js';
import userInfoRouter from './userinfo/userinforouter.js';

const userApiRouter = express.Router();

userApiRouter.use('/user/auth', userAuthRouter);
userInfoRouter.use('/user/user', userInfoRouter);
export default userApiRouter;
