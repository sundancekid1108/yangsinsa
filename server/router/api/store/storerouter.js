import express from "express";
import storeUserAuthRouter from "./storeuserauthrouter/storeuserauthrouter.js";

const storeRouter = express.Router();

storeRouter.use("/auth", storeUserAuthRouter);

export default storeRouter;
