import express from "express";
import userRouter from "./user/userrouter.js";
import adminRouter from "./admin/adminrouter.js";
import storeRouter from "./store/storerouter.js";
const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/store", storeRouter);

apiRouter.get("/", (req, res) => {
	return res.status(200).json({
		message: "USER API Server is running.",
	});
});

export default apiRouter;
