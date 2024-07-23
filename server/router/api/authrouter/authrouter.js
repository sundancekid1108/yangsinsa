import express from 'express';
import User from '../../../database/model/user/user.js';
import keys from '../../../config/key/key.js';

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        res.status(200).json({
            message: 'Login Successful'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})


export default authRouter