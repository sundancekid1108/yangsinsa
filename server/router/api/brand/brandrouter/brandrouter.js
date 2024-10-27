import express from "express";
import Brand from "../../../../database/model/brand/brand.js";
import Store from "../../../../database/model/store/store.js";
import {authAdmin} from "../../../../middleware/authadmin/authadmin.js";
const brandRouter = express.Router();

brandRouter.post("/createbrand", async (req, res) => {
	try {
		const { brandName, brandDescription } = req.body;

		if (!brandName || !brandDescription) {
			return res.status(400).json({
				error: "필수 필드를 입력해주세요.",
			});
		}

		const duplicateBrand = await Brand.findOne({ brandName });
		if (duplicateBrand) {
			return res.status(400).json({
				error: "이미 등록된 브랜드입니다.",
			});
		}

		const newBrand = new Brand({
			brandName,
			brandDescription,
		});

		await newBrand.save().then((brand) => {
			return res.status(200).json({
				success: true,
				brand: {
					id: brand._id,
					brandName: brand.brandName,
					brandDescription: brand.brandDescription,
				},
			});
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error,
		});
	}
});

brandRouter.get("/brandlist",  async (req, res, next) => {

	try {

		const brandList = await Brand.find().sort("-createdDate").exec();

		return res.json({
			success: true,
			brandList,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error,
		});
	}
});

brandRouter.post("/searchbrand", authAdmin, async (req, res) => {
	try {

	} catch (error) {

	}
});


brandRouter.get("/branddetail/:brandid", async (req, res) => {
	try {
		const { brandId } = req.params.brandid;
		const brand = await Brand.findById(brandId);
		if (brand) {
			return res.status(200).json({
				success: true,
				store,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: "브랜드 정보 없음",
			});
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error,
		});
	}
});

export default brandRouter;
