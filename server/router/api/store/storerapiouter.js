import express from "express";
import {authAdmin}from '../../../middleware/authadmin/authadmin.js'
import storeadminauthrouter from "./storeadminauthrouter/storeadminauthrouter.js";
import storeRouter from "./storerouter/storerouter.js";
import verifyToken from '../../../middleware/verifytoken/verifytoken.js'
const storeApiRouter = express.Router();

storeApiRouter.use("/store/auth", storeadminauthrouter);
storeApiRouter.use("/store", verifyToken, storeRouter);

export default storeApiRouter;
