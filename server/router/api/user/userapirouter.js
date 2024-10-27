import express from "express";
import userAuthRouter from "./userauthrouter/userauthrouter.js";

const userApiRouter = express.Router();

userApiRouter.use("/user/auth", userAuthRouter);

export default userApiRouter;
