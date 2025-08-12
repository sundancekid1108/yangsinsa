import express from "express";
import adminAuthRouter from './admin/admin.js'
import storeAdminAuthRouter from './storeadmin/storeadmin.js'
import userAuthRouter from './user/user.js'

const authRouter = express.Router();


authRouter.use('/auth/admin', adminAuthRouter);
authRouter.use('/auth/storeadmin', storeAdminAuthRouter)
authRouter.use('/auth/user', userAuthRouter);


export default authRouter