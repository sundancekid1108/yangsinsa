import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import AdminUser from "../../../../database/model/adminuser/adminuser.js";
import keys from "../../../../config/keys/keys.js";
import constants from "../../../../constants/constants.js";

const adminUserAuthRouter = express.Router();

adminUserAuthRouter.post("/login", async (req, res) => {
	try {
		const { userName, password } = req.body;

		// 필수 필드 체크
		if (!userName || !password) {
			return res.status(400).json({
				error: "필수 필드를 입력해주세요.",
			});
		}

		const adminUser = await AdminUser.findOne({ userName });

		//유저 등록 체크
		if (!adminUser) {
			return res.status(400).json({
				error: "등록되지 않은 유저입니다.",
			});
		}

		// 비밀번호 체크
		const passwordMatch = await bcrypt.compare(password, adminUser.password);

		if (passwordMatch) {
			const secret = keys.jwt.secret;
			const tokenLife = keys.jwt.tokenLife;

			const payload = {
				id: adminUser.id,
				userName: adminUser.userName,
				adminGrade: adminUser.adminGrade,
			};

			const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

			if (!token) {
				throw new Error();
			}

			return res.status(200).json({
				success: true,
				token: `Bearer ${token}`,
				adminUser: {
					id: adminUser.id,
					userName: adminUser.userName,
					adminGrade: adminUser.adminGrade,
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

adminUserAuthRouter.post("/register", async (req, res) => {
	try {
		const { userName, password, firstName, lastName, phoneNumber } = req.body;

		// 필드 미입력 체크
		if (!userName || !password || !firstName || !lastName || !phoneNumber) {
			return res.status(400).json({ error: "필수 필드를 입력해주세요." });
		}

		// 유저명 중복 체크
		if (userName) {
			const dupulicateUserName = await AdminUser.findOne({
				userName,
			});
			if (dupulicateUserName) {
				return res.status(400).json({ error: "이미 등록된  유저명입니다." });
			}
		}

		// 전화번호 중복 체크
		if (phoneNumber) {
			const dupulicateAdminUserPhoneNumber = await AdminUser.findOne({
				phoneNumber,
			});
			if (dupulicateAdminUserPhoneNumber) {
				return res.status(400).json({ error: "이미 등록된 전화번호입니다." });
			}
		}

		const newAdminUser = new AdminUser({
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
				success: true,
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
			success: false,
			error: error,
		});
	}
});

adminUserAuthRouter.post("/login", async (req, res) => {
	try {
		const { userName, password } = req.body;

		if (!userName || !password) {
			return res.status(400).json({
				error: "필수 필드를 입력해주세요.",
			});
		}

		const adminUser = await AdminUser.findOne({ userName });

		if (!adminUser) {
			return res.status(400).json({
				error: "등록되지 않은 유저입니다.",
			});
		}

		const passwordMatch = await bcrypt.compare(password, adminUser.password);

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

			if (!token) {
				throw new Error();
			}

			return res.status(200).json({
				success: true,
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
				success: false,
				error: "아이디, 패스워드를 확인해주세요.",
			});
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error,
		});
	}
});

adminUserAuthRouter.post("/updateprofile", async (req, res) => {
	try {
		const updateAdminUserInfo = req.body;
		const adminUser = await AdminUser.findById(updateAdminUserInfo.id);
		if (!adminUser) {
			return res.status(500).json({
				success: false,
				error: "유저 정보를 찾을 수 없습니다.",
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
				const dupulicateAdminUserPhoneNumber = await AdminUser.findOne({
					phoneNumber: updateAdminUserInfo.phoneNumber,
				});
				if (dupulicateAdminUserPhoneNumber) {
					return res.status(400).json({
						error: "이미 등록된 전화번호입니다.",
					});
				} else {
					adminUser.phoneNumber = updateAdminUserInfo.phoneNumber;
				}
			}
		}

		await adminUser.save().then((adminUser) => {
			return res.status(200).json({
				success: true,
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
			success: false,
			error: error,
		});
	}
});

adminUserAuthRouter.post("/delete", async (req, res) => {
	try {
		// 어드민  삭제
		const { id } = req.body;
		const adminUser = await AdminUser.findById(id);

		return res.status(200).json({
			success: true,
			message: " 유저 정보 삭제 작업중",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error,
		});
	}
});

export default adminUserAuthRouter;
