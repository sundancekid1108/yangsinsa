import express from 'express'
import authRouter from './user/authrouter/authrouter.js';

const apiRouter = express.Router();

apiRouter.use('/user/auth', authRouter);

export default apiRouter