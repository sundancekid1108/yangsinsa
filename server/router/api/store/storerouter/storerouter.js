const express = require("express");
import Store from "../../../database/model/store/store.js";
const storerouter = express.Router();

storerouter.post("/createstore", async (req, res) => {
	try {
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error,
		});
	}
});
