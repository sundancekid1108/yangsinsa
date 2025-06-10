import express from 'express';
import StoreAdmin from '../../../../database/model/storeadmin/storeadmin.js';
import bcrypt from 'bcryptjs';
import {
	generateRefreshToken,
	generateAccessToken,
} from '../../../../utils/generatetoken/generatetoken.js';
import keys from '../../../../config/keys/keys.js';
import jwt from 'jsonwebtoken';

const storeAdminInfoRouter = express.Router();

storeAdminInfoRouter.get('/userinfo', async (req, res) => {
	try {
		const { decoded } = req.body;
		const storeAdminUserId = decoded.id;

		const data = await StoreAdmin.findById(storeAdminUserId);

		return res.status(200).json({
			storeAdmin: {
				id: data._id,
				avatar: data.avatar,
				koreanName: data.koreanName,
				phoneNumber: data.phoneNumber,
				email: data.email,
				adminGrade: data.adminGrade,
			},
		});
	} catch (error) {
		return res.status(500).json({
			error,
		});
	}
});

storeAdminInfoRouter.post('/updateuserinfo', async (req, res) => {
	const updatestoreAdminInfo = req.body;
	const storeAdmin = await StoreAdmin.findById(updatestoreAdminInfo.id);
	if (!storeAdmin) {
		return res.status(500).json({
			message: '유저 정보를 찾을 수 없습니다.',
		});
	} else {
		if (updatestoreAdminInfo.userName) {
			const duplicatestoreAdminName = await StoreAdmin.findOne({
				userName: updatestoreAdminInfo.userName,
			});
			if (duplicatestoreAdminName) {
				return res.status(400).json({
					message: '이미 등록된 유저명입니다.',
				});
			} else {
				storeAdmin.userName = updatestoreAdminInfo.userName;
			}
		}
		// 패스워드 업데이트
		if (updatestoreAdminInfo.password) {
			const password = updatestoreAdminInfo.password;
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			storeAdmin.password = hash;
		}
		await storeAdmin.save().then((storeAdmin) => {
			return res.status(200).json({
				storeAdmin: {
					id: storeAdmin.id,
					userName: storeAdmin.userName,
				},
			});
		});
	}
});

export default storeAdminInfoRouter;
