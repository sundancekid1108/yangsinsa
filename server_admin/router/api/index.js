import express from 'express'
import authRouter from './adminuser/authrouter/authrouter.js';

const apiRouter = express.Router();

apiRouter.use('/admin/auth', authRouter);

export default apiRouter