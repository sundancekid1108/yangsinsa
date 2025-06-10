import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import passport from 'passport';
import User from '../../../../database/model/user/user.js';
import keys from '../../../../config/keys/keys.js';
import constants from '../../../../constants/constants.js';
import {
	generateAccessToken,
	generateRefreshToken,
} from '../../../../utils/generatetoken/generatetoken.js';

const userAuthRouter = express.Router();

userAuthRouter.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		/* 이메일, 패스워드 입력 확인 */
		if (!email || !password) {
			return res.status(400).json({
				message: '이메일, 패스워드를 확인해주세요.',
			});
		}

		const user = await User.findOne({ email: email });
		console.log(user);

		if (!user) {
			return res.status(400).json({
				message: '존재하지 않는 계정입니다.',
			});
		} else if (user.provider !== constants.MAIL_PROVIDER.EMAIL) {
			return res.status(400).json({
				message: '구글 계정으로 로그인하셔야 합니다.',
			});
		}

		// 비밀번호 체크
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (passwordMatch) {
			const payload = {
				id: user.id,
				email: user.email,
				userName: user.userName,
				role: user.role,
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
					user: {
						id: user.id,
						email: user.email,
						userName: user.userName,
						role: user.role,
					},
				});
		} else {
			return res.status(400).json({
				message: '이메일, 패스워드를 확인해주세요.',
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: error,
		});
	}
});

userAuthRouter.post('/register', async (req, res) => {
	try {
		// 이메일 회원가입 구현
		const { email, userName, password } = req.body;

		// 이메일 체크
		if (!email) {
			return res.status(400).json({ message: '이메일이 없습니다.' });
		} else {
			const dupulicateEmailUser = await User.findOne({ email: email });
			if (dupulicateEmailUser) {
				return res
					.status(400)
					.json({ message: '이미 등록된 이메일입니다.' });
			}
		}

		// 유저명 체크
		if (!userName) {
			return res.status(400).json({ message: '유저명이 없습니다.' });
		} else {
			const dupulicateUserName = await User.findOne({
				userName: userName,
			});
			if (dupulicateUserName) {
				return res
					.status(400)
					.json({ message: '이미 등록된  유저명입니다.' });
			}
		}

		// 비밀번호 필드 체크
		if (!password) {
			return res.status(400).json({ message: '비밀번호가 없습니다.' });
		}

		const newUser = new User({
			email,
			password,
			userName,
		});

		// 비밀번호 암호화
		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			newUser.password = hash;
		}

		// 유저 정보 저장
		await newUser.save().then((user) => {
			// console.log(user)
			return res.status(200).json({
				user: {
					id: user.id,
					email: user.email,
					userName: user.userName,
					role: user.role,
				},
			});
		});
	} catch (error) {
		// console.log(error);
		return res.status(500).json({
			message: error,
		});
	}
});

userAuthRouter.post('/updateuserinfo', async (req, res) => {
	try {
		const updateUserInfo = req.body;
		const user = await User.findOne({ _id: updateUserInfo.id });
		if (!user) {
			return res.status(500).json({
				message: '유저 정보를 찾을 수 없습니다.',
			});
		} else {
			// 이메일 업데이트
			// 이메일 중복 체크 후 업데이트
			if (updateUserInfo.email) {
				const checkDuplicateEmailUser = await User.findOne({
					email: updateUserInfo.email,
				});
				if (checkDuplicateEmailUser) {
					return res.status(500).json({
						message: '이미 등록된 이메일입니다.',
					});
				} else {
					user.email = updateUserInfo.email;
				}
			}

			// 패스워드 업데이트
			if (updateUserInfo.password) {
				const password = updateUserInfo.password;
				const salt = await bcrypt.genSalt(10);
				const hash = await bcrypt.hash(password, salt);

				user.password = hash;
			}

			//  유저명 업데이트
			//유저명 등록 후 업데이트
			if (updateUserInfo.userName) {
				const checkDuplicateUserName = await User.findOne({
					userName: updateUserInfo.userName,
				});
				if (checkDuplicateUserName) {
					return res.status(500).json({
						message: '이미 등록된 유저명입니다.',
					});
				} else {
					user.userName = updateUserInfo.userName;
				}
			}

			await user.save().then((user) => {
				return res.status(200).json({
					user: {
						id: user.id,
						email: user.email,
						userName: user.userName,
						role: user.role,
					},
				});
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

userAuthRouter.post('/deleteprofile', async (req, res) => {
	try {
		// 유저 삭제
		// 1. 유저 주문 목록 체크
		// 2. 주문 목록 있으면 삭제 불가, 없으면 삭제 진행

		return res.status(200).json({
			message: ' 유저 정보 삭제 작업중',
		});
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

userAuthRouter.get('/refreshaccesstoken', async (req, res) => {
	const headers = req.headers;

	const refreshToken = headers.cookie.split('refreshToken=')[1];

	const payload = {
		id: refreshToken.id,
		userName: refreshToken.userName,
		adminGrade: refreshToken.adminGrade,
	};

	const newAccessToken = generateAccessToken(payload);
	return res
		.status(200)
		.header('Authorization', `Bearer ${newAccessToken}`)
		.json({ message: 'Access Token 재발급' });
});

export default userAuthRouter;
