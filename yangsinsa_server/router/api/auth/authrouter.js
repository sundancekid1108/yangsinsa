import express from "express";
import adminAuthRouter from './admin/admin.js'

const authRouter = express.Router();


authRouter.use('/auth/admin', adminAuthRouter);

export default authRouter