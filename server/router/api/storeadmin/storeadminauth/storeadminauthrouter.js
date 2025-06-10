import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import passport from 'passport';
import StoreAdmin from '../../../../database/model/storeadmin/storeadmin.js';
import Refreshtoken from '../../../../database/model/refreshtoken/refreshtoken.js';
import keys from '../../../../config/keys/keys.js';
import constants from '../../../../constants/constants.js';
import {
	generateAccessToken,
	generateRefreshToken,
} from '../../../../utils/generatetoken/generatetoken.js';

const storeAdminAuthRouter = express.Router();

storeAdminAuthRouter.post('/login', async (req, res) => {
	try {
		const { userName, password } = req.body;

		// 필수 필드 체크
		if (!userName || !password) {
			return res.status(400).json({
				message: '필수 필드를 입력해주세요.',
			});
		}
		const storeAdmin = await StoreAdmin.findOne({ userName: userName });

		//유저 등록 체크
		if (!storeAdmin) {
			return res.status(400).json({
				message: '등록되지 않은 유저입니다.',
			});
		}

		//비밀번호 체크
		const passwordMatch = await bcrypt.compare(
			password,
			storeAdmin.password,
		);

		if (passwordMatch) {
			const payload = {
				id: storeAdmin.id,
				userName: storeAdmin.userName,
				adminGrade: storeAdmin.adminGrade,
			};

			const token = generateAccessToken(payload);
			const refreshToken = generateRefreshToken(payload);

			return res
				.status(200)

				.cookie('refreshToken', refreshToken, {
					httpOnly: true,
				})
				.header('Authorization', `Bearer ${token}`)
				.json({
					storeAdmin: {
						id: storeAdmin.id,
						userName: storeAdmin.userName,
						adminGrade: storeAdmin.adminGrade,
					},
				});
		} else {
			return res.status(400).json({
				message: '아이디, 패스워드를 확인해주세요.',
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: error,
		});
	}
});

storeAdminAuthRouter.post('/register', async (req, res) => {
	try {
		const { userName, password, koreanName, phoneNumber, email } = req.body;
		// 필수 필드 체크
		if (!userName || !password || !koreanName || !phoneNumber || !email) {
			return res.status(400).json({
				message: '필수 필드를 입력해주세요.',
			});
		}
		// 유저명 중복 체크
		if (userName) {
			const dupulicateUserName = await StoreAdmin.findOne({
				userName: userName,
			});
			if (dupulicateUserName) {
				return res.status(400).json({
					message: '이미 등록된 유저명입니다.',
				});
			}
		}

		// 전화번호 중복 체크
		if (phoneNumber) {
			const dupulicatestoreAdminPhoneNumber = await StoreAdmin.findOne({
				phoneNumber: phoneNumber,
			});
			if (dupulicatestoreAdminPhoneNumber) {
				return res.status(400).json({
					message: '이미 등록된 전화번호입니다.',
				});
			}
		}

		// 이메일 중복 체크
		if (email) {
			const dupulicatestoreAdminEmail = await StoreAdmin.findOne({
				email: email,
			});
			if (dupulicatestoreAdminEmail) {
				return res.status(400).json({
					message: '이미 등록된 이메일입니다.',
				});
			}
		}

		const newstoreAdmin = new StoreAdmin({
			userName,
			password,
			koreanName,
			phoneNumber,
			email,
		});

		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			newstoreAdmin.password = hash;
		}

		// 유저 정보 저장
		await newstoreAdmin.save().then((storeAdmin) => {
			// console.log(user)
			return res.status(200).json({
				storeAdmin: {
					id: storeAdmin.id,
					userName: storeAdmin.userName,
				},
			});
		});
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

storeAdminAuthRouter.get('/refreshaccesstoken', async (req, res) => {
	const secret = keys.refreshTokenSecret;
	const headers = req.headers;
	const refreshToken = headers.cookie.split('refreshToken=')[1];
	const decoded = jwt.verify(refreshToken, secret); // JWT를 검증합니다.

	const payload = {
		id: decoded.id,
		userName: decoded.userName,
		adminGrade: decoded.adminGrade,
	};

	const newAccessToken = generateAccessToken(payload);
	return res
		.status(200)
		.header('Authorization', `Bearer ${newAccessToken}`)
		.json({ message: 'Access Token 재발급' });
});
export default storeAdminAuthRouter;
