import express from 'express';
import adminAuthRouter from './adminauth/adminauthrouter.js';
import adminInfoRouter from './admininfo/admininforouter.js';
import verifyToken from '../../../middleware/verifytoken/verifytoken.js';

const adminApiRouter = express.Router();

adminApiRouter.use('/admin/auth', adminAuthRouter);
adminApiRouter.use('/admin/user', verifyToken, adminInfoRouter);

export default adminApiRouter;
