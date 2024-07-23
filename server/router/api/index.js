import express from 'express'
import authRoutes from './authrouter/authrouter.js'

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);

export default apiRouter