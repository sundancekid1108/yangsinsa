import express from "express";
import storeUserAuthRouter from "./storeuserauthrouter/storeuserauthrouter.js";
import storeRouter from "./storerouter/storerouter.js";
const storeApiRouter = express.Router();

storeApiRouter.use("/auth", storeUserAuthRouter);
storeApiRouter.use("/store", storeRouter);

export default storeApiRouter;
