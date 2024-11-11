import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import passport from "passport";
import StoreAdmin from "../../../../database/model/storeadmin/storeadmin.js";
import Refreshtoken from "../../../../database/model/refreshtoken/refreshtoken.js";
import keys from "../../../../config/keys/keys.js";
import constants from "../../../../constants/constants.js";
import {generateToken, generateRefreshToken} from '../../../../utils/generatetoken/generatetoken.js';

const storeadminauthrouter = express.Router();

storeadminauthrouter.post("/login", async (req, res) => {
	try {
		const { userName, password } = req.body;

		// 필수 필드 체크
		if (!userName || !password) {
			return res.status(400).json({
				error: "필수 필드를 입력해주세요.",
			});
		}
		const storeAdmin = await StoreAdmin.findOne({ userName });

		//유저 등록 체크
		if (!storeAdmin) {
			return res.status(400).json({
				error: "등록되지 않은 유저입니다.",
			});
		}

		//비밀번호 체크
		const passwordMatch = await bcrypt.compare(password, storeAdmin.password);

		if (passwordMatch) {
			const payload = {
				id: storeAdmin.id,
				userName: storeAdmin.userName,
				adminGrade: storeAdmin.adminGrade,
			};

			const token = generateToken(payload);
			const refreshToken = generateRefreshToken({});

			//로그인시 refreshToken생성
			await Refreshtoken.findOneAndUpdate(
				{ userId: storeAdmin.id } /* query */,
				{ userId: storeAdmin.id, refreshToken: refreshToken } /* update */,
				{ upsert: true } /* create if it doesn't exist */
			);

			return res.status(200).json({
				response: true,
				token: `Bearer ${token}`,
				storeAdmin: {
					id: storeAdmin.id,
					userName: storeAdmin.userName,
					adminGrade: storeAdmin.adminGrade,
				},
			});
		} else {
			return res.status(400).json({
				response: false,
				error: "이메일, 패스워드를 확인해주세요.",
			});
		}
	} catch (error) {
		return res.status(500).json({
			response: false,
			error: error,
		});
	}
});

storeadminauthrouter.post("/register", async (req, res) => {
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
			const dupulicateUserName = await StoreAdmin.findOne({
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
			const dupulicatestoreAdminPhoneNumber = await StoreAdmin.findOne({
				phoneNumber,
			});
			if (dupulicatestoreAdminPhoneNumber) {
				return res.status(400).json({
					error: "이미 등록된 전화번호입니다.",
				});
			}
		}

		// 이메일 중복 체크
		if (email) {
			const dupulicatestoreAdminEmail = await StoreAdmin.findOne({
				email,
			});
			if (dupulicatestoreAdminEmail) {
				return res.status(400).json({
					error: "이미 등록된 이메일입니다.",
				});
			}
		}

		const newstoreAdmin = new StoreAdmin({
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
			newstoreAdmin.password = hash;
		}

		// 유저 정보 저장
		await newstoreAdmin.save().then((storeAdmin) => {
			// console.log(user)
			return res.status(200).json({
				response: true,
				storeAdmin: {
					id: storeAdmin.id,
					userName: storeAdmin.userName,
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

storeadminauthrouter.post("/updateprofile", async (req, res) => {
	const updatestoreAdminInfo = req.body;
	const storeAdmin = await StoreAdmin.findById(updatestoreAdminInfo.id);
	if (!storeAdmin) {
		return res.status(500).json({
			response: false,
			error: "유저 정보를 찾을 수 없습니다.",
		});
	} else {
		if (updatestoreAdminInfo.userName) {
			const duplicatestoreAdminName = await StoreAdmin.findOne({
				userName: updatestoreAdminInfo.userName,
			});
			if (duplicatestoreAdminName) {
				return res.status(400).json({
					response: false,
					error: "이미 등록된 유저명입니다.",
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
				response: true,
				storeAdmin: {
					id: storeAdmin.id,
					userName: storeAdmin.userName,
				},
			});
		});
	}
});

export default storeadminauthrouter;
