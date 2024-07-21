import express from 'express';
import User from '../../../database/model/user/user';
import keys from '../../../config/key/key';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})