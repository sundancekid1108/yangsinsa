import express from 'express'
import config from '../config/config.js'
import authRouter from './api/auth/authrouter.js'

const router = express.Router();


const PORT = config.port;

router.get('/' , (req, res) => {
    return res.status(200).json({
        message: `Backend Server on Listening on port ${PORT}. Check http://localhost:${PORT}/ `
    });
})


router.use(authRouter)

export default router;