import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import Admin from '../../../../database/model/admin/admin.js';
import Refreshtoken from '../../../../database/model/refreshtoken/refreshtoken.js';
import keys from '../../../../config/keys/keys.js';
import constants from '../../../../constants/constants.js';
import {
	generateAccessToken,
	generateRefreshToken,
} from '../../../../utils/generatetoken/generatetoken.js';

const adminInfoRouter = express.Router();

adminInfoRouter.post('/updateuserinfo', async (req, res) => {
	try {
		const updateAdminUserInfo = req.body;
		const adminUser = await Admin.findById(updateAdminUserInfo.id);
		if (!adminUser) {
			return res.status(500).json({
				message: '유저 정보를 찾을 수 없습니다.',
			});
		} else {
			// 패스워드 업데이트
			if (updateAdminUserInfo.password) {
				const password = updateAdminUserInfo.password;
				const salt = await bcrypt.genSalt(10);
				const hash = await bcrypt.hash(password, salt);

				adminUser.password = hash;
			}

			//전화번호 업데이트(중복 체크 포함)
			if (updateAdminUserInfo.phoneNumber) {
				const dupulicateAdminUserPhoneNumber = await Admin.findOne({
					phoneNumber: updateAdminUserInfo.phoneNumber,
				});
				if (dupulicateAdminUserPhoneNumber) {
					return res.status(400).json({
						message: '이미 등록된 전화번호입니다.',
					});
				} else {
					adminUser.phoneNumber = updateAdminUserInfo.phoneNumber;
				}
			}
		}

		await adminUser.save().then((adminUser) => {
			return res.status(200).json({
				adminUser: {
					id: adminUser.id,
					firstName: adminUser.firstName,
					lastName: adminUser.lastName,
					phoneNumber: adminUser.phoneNumber,
					adminGrade: adminUser.adminGrade,
				},
			});
		});
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

adminInfoRouter.post('/deleteuserinfo', async (req, res) => {
	try {
		// 어드민  삭제
		const { id } = req.body;
		const adminUser = await Admin.findById(id);

		return res.status(200).json({
			message: ' 유저 정보 삭제 작업중',
		});
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

adminInfoRouter.get('/userinfo', async (req, res) => {});

export default adminInfoRouter;
