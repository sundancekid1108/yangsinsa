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
	generateToken,
	generateRefreshToken,
} from '../../../../utils/generatetoken/generatetoken.js';

const adminAuthRouter = express.Router();

adminAuthRouter.post('/login', async (req, res) => {
	try {
		const { userName, password } = req.body;

		// 필수 필드 체크
		if (!userName || !password) {
			return res.status(400).json({
				error: '필수 필드를 입력해주세요.',
			});
		}

		const adminUser = await Admin.findOne({ userName });

		//유저 등록 체크
		if (!adminUser) {
			return res.status(400).json({
				error: '등록되지 않은 유저입니다.',
			});
		}

		// 비밀번호 체크
		const passwordMatch = await bcrypt.compare(
			password,
			adminUser.password,
		);

		if (passwordMatch) {
			const payload = {
				id: adminUser.id,
				userName: adminUser.userName,
				adminGrade: adminUser.adminGrade,
			};

			const token = generateToken(payload);
			const refreshToken = generateRefreshToken(payload);

			return res
				.status(200)

				.cookie('refreshToken', refreshToken, {
					httpOnly: true,
				})
				.header('Authorization', `Bearer ${token}`)
				.json({
					response: true,
					adminUser: {
						id: adminUser.id,
						userName: adminUser.userName,
						adminGrade: adminUser.adminGrade,
					},
				});
		} else {
			return res.status(400).json({
				response: false,
				error: '이메일, 패스워드를 확인해주세요.',
			});
		}
	} catch (error) {
		return res.status(500).json({
			response: false,
			error: error,
		});
	}
});

adminAuthRouter.post('/logout', async (req, res) => {});

adminAuthRouter.post('/register', async (req, res) => {
	try {
		const { userName, password, firstName, lastName, phoneNumber } =
			req.body;

		// 필드 미입력 체크
		if (!userName || !password || !firstName || !lastName || !phoneNumber) {
			return res.status(400).json({ error: '필수 필드를 입력해주세요.' });
		}

		// 유저명 중복 체크
		if (userName) {
			const dupulicateUserName = await Admin.findOne({
				userName,
			});
			if (dupulicateUserName) {
				return res
					.status(400)
					.json({ error: '이미 등록된  유저명입니다.' });
			}
		}

		// 전화번호 중복 체크
		if (phoneNumber) {
			const dupulicateAdminUserPhoneNumber = await Admin.findOne({
				phoneNumber,
			});
			if (dupulicateAdminUserPhoneNumber) {
				return res
					.status(400)
					.json({ error: '이미 등록된 전화번호입니다.' });
			}
		}

		const newAdminUser = new Admin({
			userName,
			password,
			firstName,
			lastName,
			phoneNumber,
		});

		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			newAdminUser.password = hash;
		}

		// 유저 정보 저장
		await newAdminUser.save().then((adminUser) => {
			// console.log(user)
			return res.status(200).json({
				response: true,
				adminUser: {
					id: adminUser.id,
					email: adminUser.email,
					userName: adminUser.userName,
					role: adminUser.role,
				},
			});
		});
	} catch (error) {
		return res.status(500).json({
			response: false,
			error: error,
		});
	}
});

adminAuthRouter.post('/login', async (req, res) => {
	try {
		const { userName, password } = req.body;

		if (!userName || !password) {
			return res.status(400).json({
				error: '필수 필드를 입력해주세요.',
			});
		}

		const adminUser = await Admin.findOne({ userName });

		if (!adminUser) {
			return res.status(400).json({
				error: '등록되지 않은 유저입니다.',
			});
		}

		const passwordMatch = await bcrypt.compare(
			password,
			adminUser.password,
		);

		if (passwordMatch) {
			const secret = keys.jwt.secret;
			const tokenLife = keys.jwt.tokenLife;

			const payload = {
				id: adminUser.id,
				email: adminUser.email,
				userName: adminUser.userName,
				role: adminUser.role,
			};

			const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

			return res.status(200).json({
				response: true,
				token: `Bearer ${token}`,
				adminUser: {
					id: adminUser.id,
					firstName: adminUser.firstName,
					lastName: adminUser.lastName,
					phoneNumber: adminUser.phoneNumber,
					adminGrade: adminUser.adminGrade,
				},
			});
		} else {
			return res.status(400).json({
				response: false,
				error: '아이디, 패스워드를 확인해주세요.',
			});
		}
	} catch (error) {
		return res.status(500).json({
			response: false,
			error: error,
		});
	}
});

adminAuthRouter.post('/updateprofile', async (req, res) => {
	try {
		const updateAdminUserInfo = req.body;
		const adminUser = await Admin.findById(updateAdminUserInfo.id);
		if (!adminUser) {
			return res.status(500).json({
				response: false,
				error: '유저 정보를 찾을 수 없습니다.',
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
						error: '이미 등록된 전화번호입니다.',
					});
				} else {
					adminUser.phoneNumber = updateAdminUserInfo.phoneNumber;
				}
			}
		}

		await adminUser.save().then((adminUser) => {
			return res.status(200).json({
				response: true,
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
			response: false,
			error: error,
		});
	}
});

adminAuthRouter.post('/deleteuserinfo', async (req, res) => {
	try {
		// 어드민  삭제
		const { id } = req.body;
		const adminUser = await Admin.findById(id);

		return res.status(200).json({
			response: true,
			message: ' 유저 정보 삭제 작업중',
		});
	} catch (error) {
		return res.status(500).json({
			response: false,
			error: error,
		});
	}
});

adminAuthRouter.get('/updateaccessetoken', async (req, res) => {
	const headers = req.headers;

	const refreshToken = headers.cookie.split('refreshToken=')[1];

	const payload = {
		id: refreshToken.id,
		userName: refreshToken.userName,
		adminGrade: refreshToken.adminGrade,
	};

	const newAccessToken = generateToken(payload);
	return res
		.status(200)
		.header('Authorization', `Bearer ${newAccessToken}`)
		.json({ message: 'Access Token 재발급' });
});

export default adminAuthRouter;
