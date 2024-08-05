import express from "express";
import adminUserAuthRouter from "./adminuserauthrouter/adminuserauthrouter.js";

const adminRouter = express.Router();

adminRouter.use("/auth", adminUserAuthRouter);

export default adminRouter;
