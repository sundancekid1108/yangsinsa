import express from 'express';
import Brand from '../../../../database/model/brand/brand.js';
import Store from '../../../../database/model/store/store.js';
import { authAdmin } from '../../../../middleware/authadmin/authadmin.js';
const brandRouter = express.Router();

brandRouter.post('/createbrand', async (req, res) => {
	try {
		const { brandName, brandDescription } = req.body;

		if (!brandName || !brandDescription) {
			return res.status(400).json({
				message: '필수 필드를 입력해주세요.',
			});
		}

		const duplicateBrand = await Brand.findOne({ brandName });
		if (duplicateBrand) {
			return res.status(400).json({
				message: '이미 등록된 브랜드입니다.',
			});
		}

		const newBrand = new Brand({
			brandName,
			brandDescription,
		});

		await newBrand.save().then((brand) => {
			return res.status(200).json({
				brand: {
					id: brand._id,
					brandName: brand.brandName,
					brandDescription: brand.brandDescription,
				},
			});
		});
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

brandRouter.get('/brandlist', async (req, res, next) => {
	try {
		const brandList = await Brand.find().sort('-createdDate').exec();

		return res.json({
			brandList,
		});
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

brandRouter.post('/searchbrand', authAdmin, async (req, res) => {
	try {
		return res.json({
			message: 'Search Brand',
		});
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

brandRouter.get('/branddetail/:brandid', async (req, res) => {
	try {
		const { brandId } = req.params.brandid;
		const brand = await Brand.findById(brandId);
		if (brand) {
			return res.status(200).json({
				store,
			});
		} else {
			return res.status(500).json({
				message: '브랜드 정보 없음',
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

export default brandRouter;
