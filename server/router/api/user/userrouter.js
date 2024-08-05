import express from 'express'
import userAuthRouter from './userauthrouter/userauthrouter.js';

const userRouter = express.Router();

userRouter.use('/auth', userAuthRouter)

export default userRouter