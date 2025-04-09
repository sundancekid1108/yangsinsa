import express from 'express';
import storeRouter from './storerouter/storerouter.js';
import verifyToken from '../../../middleware/verifytoken/verifytoken.js';
const storeApiRouter = express.Router();

storeApiRouter.use('/store/', verifyToken, storeRouter);

export default storeApiRouter;
