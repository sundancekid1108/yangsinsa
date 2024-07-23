import express from 'express'
import apiRouter from './api/index.js';
import keys from '../config/key/key.js';
const router = express.Router();

const apiURL = keys.apiURL;

const api = `/${apiURL}`;

console.log(api)
// api routes
router.use(api, apiRouter);
router.use(api, (req, res) => res.status(404).json('No API route found'));


export default router