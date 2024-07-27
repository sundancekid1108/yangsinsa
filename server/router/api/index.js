import express from 'express'
import authRouter from './authrouter/authrouter.js'

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);

export default apiRouter