import express from 'express'
import authRouter from './storeuser/authrouter/authrouter.js';

const apiRouter = express.Router();

apiRouter.use('/store/auth', authRouter);

export default apiRouter