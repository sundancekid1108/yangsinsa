import express from "express";
import userAuthRouter from "./userauthrouter/userauthrouter.js";

const userApiRouter = express.Router();

userApiRouter.use("/auth", userAuthRouter);

export default userApiRouter;
