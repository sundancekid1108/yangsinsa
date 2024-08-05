import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import passport from "passport";
import StoreUser from "../../../../database/model/storeuser/storeuser.js";
import keys from "../../../../config/keys/keys.js";
import constants from "../../../../constants/constants.js";

const storeUserAuthRouter = express.Router();

storeUserAuthRouter.post("/login", async (req, res) => {
	try {
		const { userName, password } = req.body;

		// 필수 필드 체크
		if (!userName || !password) {
			return res.status(400).json({
				error: "필수 필드를 입력해주세요.",
			});
		}
		const storeUser = await StoreUser.findOne({ userName });

		//유저 등록 체크
		if (!storeUser) {
			return res.status(400).json({
				error: "등록되지 않은 유저입니다.",
			});
		}

		//비밀번호 체크
		const passwordMatch = await bcrypt.compare(password, storeUser.password);

		if (passwordMatch) {
			const secret = keys.jwt.secret;
			const tokenLife = keys.jwt.tokenLife;

			const payload = {
				id: storeUser.id,
				userName: storeUser.userName,
				adminGrade: storeUser.adminGrade,
			};

			const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

			if (!token) {
				throw new Error();
			}

			return res.status(200).json({
				success: true,
				token: `Bearer ${token}`,
				adminUser: {
					id: storeUser.id,
					userName: storeUser.userName,
					adminGrade: storeUser.adminGrade,
				},
			});
		} else {
			return res.status(400).json({
				success: false,
				error: "이메일, 패스워드를 확인해주세요.",
			});
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error,
		});
	}
});

storeUserAuthRouter.post("/register", async (req, res) => {
	try {
		const { userName, password, firstName, lastName, phoneNumber, email } =
			req.body;
		// 필수 필드 체크
		if (
			!userName ||
			!password ||
			!firstName ||
			!lastName ||
			!phoneNumber ||
			!email
		) {
			return res.status(400).json({
				error: "필수 필드를 입력해주세요.",
			});
		}
		// 유저명 중복 체크
		if (userName) {
			const dupulicateUserName = await StoreUser.findOne({
				userName,
			});
			if (dupulicateUserName) {
				return res.status(400).json({
					error: "이미 등록된 유저명입니다.",
				});
			}
		}

		// 전화번호 중복 체크
		if (phoneNumber) {
			const dupulicateStoreUserPhoneNumber = await StoreUser.findOne({
				phoneNumber,
			});
			if (dupulicateStoreUserPhoneNumber) {
				return res.status(400).json({
					error: "이미 등록된 전화번호입니다.",
				});
			}
		}

		// 이메일 중복 체크
		if (email) {
			const dupulicateStoreUserEmail = await StoreUser.findOne({
				email,
			});
			if (dupulicateStoreUserEmail) {
				return res.status(400).json({
					error: "이미 등록된 이메일입니다.",
				});
			}
		}

		const newStoreUser = new StoreUser({
			userName,
			password,
			firstName,
			lastName,
			phoneNumber,
			email,
		});

		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			newStoreUser.password = hash;
		}

		// 유저 정보 저장
		await newStoreUser.save().then((storeUser) => {
			// console.log(user)
			return res.status(200).json({
				success: true,
				storeUser: {
					id: storeUser.id,
					email: storeUser.email,
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

storeUserAuthRouter.post("/updateprofile", async (req, res) => {
	const updateStoreUserInfo = req.body;
	const storeUser = await StoreUser.findById(updateStoreUserInfo.id);
	if (!storeUser) {
		return res.status(500).json({
			success: false,
			error: "유저 정보를 찾을 수 없습니다.",
		});
	} else {
		if (updateStoreUserInfo.userName) {
			const duplicateStoreUserName = await StoreUser.findOne({
				userName: updateStoreUserInfo.userName,
			});
			if (duplicateStoreUserName) {
				return res.status(400).json({
					success: false,
					error: "이미 등록된 유저명입니다.",
				});
			} else {
				storeUser.userName = updateStoreUserInfo.userName;
			}
		}
		// 패스워드 업데이트
		if (updateStoreUserInfo.password) {
			const password = updateStoreUserInfo.password;
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			storeUser.password = hash;
		}
		await storeUser.save().then((storeUser) => {
			return res.status(200).json({
				success: true,
				storeUser: {
					id: storeUser.id,
					userName: storeUser.userName,
				},
			});
		});
	}
});

export default storeUserAuthRouter;
