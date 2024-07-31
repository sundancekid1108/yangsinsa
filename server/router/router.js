import express from 'express'
import apiRouter from './api/index.js';
import keys from '../config/keys/keys.js';
const router = express.Router();

const apiURL = keys.apiURL;

const api = `/${apiURL}`;

console.log(api)
// api routes
router.get(`/${apiURL}`, (req, res) => {
    return res.status(200).json({
        message: `${apiURL}` + " " + "API Server is running."
    })
})

router.use(api, apiRouter);
router.use(api, (req, res) => res.status(404).json('No API route found'));


export default router