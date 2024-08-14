import express from "express";
import adminUserAuthRouter from "./adminuserauthrouter/adminuserauthrouter.js";

const adminApiRouter = express.Router();

adminApiRouter.use("/auth", adminUserAuthRouter);

export default adminApiRouter;
