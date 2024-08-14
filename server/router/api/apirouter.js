import express from "express";
import userApiRouter from "./user/userapirouter.js";
import adminApiRouter from "./admin/adminapirouter.js";
import storeApiRouter from "./store/storerapiouter.js";
const apiRouter = express.Router();

apiRouter.use("/user", userApiRouter);
apiRouter.use("/admin", adminApiRouter);
apiRouter.use("/store", storeApiRouter);

apiRouter.get("/", (req, res) => {
	return res.status(200).json({
		message: "USER API Server is running.",
	});
});

export default apiRouter;
