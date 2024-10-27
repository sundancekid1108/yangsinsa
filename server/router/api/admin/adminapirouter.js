import express from "express";
import adminUserAuthRouter from "./adminauthrouter/adminauthrouter.js";

const adminApiRouter = express.Router();

adminApiRouter.use("/admin/auth", adminUserAuthRouter);

export default adminApiRouter;
