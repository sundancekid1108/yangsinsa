import express from "express";
import userApiRouter from "./user/userapirouter.js";
import adminApiRouter from "./admin/adminapirouter.js";
import storeApiRouter from "./store/storerapiouter.js";
import brandapirouter from "./brand/brandapirouter.js";
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
	return res.status(200).json({
		message: "API Server is running.",
	});
});

apiRouter.use(userApiRouter);
apiRouter.use(adminApiRouter);
apiRouter.use(storeApiRouter);
apiRouter.use(brandapirouter)



export default apiRouter;
