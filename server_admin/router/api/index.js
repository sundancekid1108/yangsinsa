import express from 'express'
import authRouter from './admin/authrouter/authrouter.js';

const apiRouter = express.Router();

apiRouter.use('/admin/auth', authRouter);

export default apiRouter