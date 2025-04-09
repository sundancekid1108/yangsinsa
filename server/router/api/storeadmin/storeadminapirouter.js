import express from 'express';
import storeAdminAuthRouter from './storeadminauth/storeadminauthrouter.js';
import storeAdminInfoRouter from './storeadmininfo/storeadmininforouter.js';
import verifyToken from '../../../middleware/verifytoken/verifytoken.js';

const storeAdminApiRouter = express.Router();

storeAdminApiRouter.use('/storeadmin/auth/', storeAdminAuthRouter);

storeAdminApiRouter.use('/storeadmin/user/', verifyToken, storeAdminInfoRouter);

export default storeAdminApiRouter;
