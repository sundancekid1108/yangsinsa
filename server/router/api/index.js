import express from 'express'
import authRouter from './user/authrouter/authrouter.js';

const apiRouter = express.Router();

apiRouter.use('/user/auth', authRouter);
apiRouter.get('/', (req, res) => {
    return res.status(200).json({
        message: "USER API Server is running."
    })
})

export default apiRouter