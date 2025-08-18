import express from 'express'
import { hashedPassword, comparePassword } from '../../../../utils/password.js'
import {
	generateAccessToken,
	generateRefreshToken,
	verifyToken,
} from '../../../../utils/token.js'
import Admin from '../../../../database/model/admin/admin.js'
import config from '../../../../config/config.js'

const adminAuthRouter = express.Router()

adminAuthRouter.post('/login', async (req, res) => {
	try {
		const { userName, password } = req.body

		// 필수 필드 체크
		if (!userName || !password) {
			return res.status(400).json({
				message: '필수 필드를 확인해주세요.',
			})
		}

		const adminUser = await Admin.findOne({ userName: userName })

		//유저 등록 체크
		if (!adminUser) {
			return res.status(404).json({
				message: '등록되지 않은 유저입니다.',
			})
		}

		// 비밀번호 체크

		const isPasswordMatch = await comparePassword(
			password,
			adminUser.password
		)

		if (isPasswordMatch) {
			const payload = {
				id: adminUser.id,
				userName: adminUser.userName,
				grade: adminUser.grade,
			}

			const accessToken = generateAccessToken(payload)
			const refreshToken = generateRefreshToken(payload)

			return res
				.status(200)
				.cookie('refreshToken', refreshToken, {
					httpOnly: true,
				})
				.header('Authorization', `Bearer ${accessToken}`)
				.json({
					payload,
				})
		} else {
			return res.status(401).json({
				message: '아이디, 패스워드를 확인해주세요.',
			})
		}
	} catch (error) {
		return res.status(500).json(error)
	}
})
adminAuthRouter.post('/register', async (req, res) => {
	try {
		const { userName, password, koreanName, phoneNumber } = req.body

		// 필드 미입력 체크
		if (!userName || !password || !koreanName || !phoneNumber) {
			return res
				.status(400)
				.json({ message: '필수 필드를 입력해주세요.' })
		}

		//패스워드 암호화
		const encryptedPassword = await hashedPassword(password)

		// 유저 정보 생성
		const newAdminUser = new Admin({
			userName: userName,
			password: encryptedPassword,
			koreanName: koreanName,
			phoneNumber: phoneNumber,
		})

		// 유저 정보 저장

		await newAdminUser.save()
		return res.status(200).json(newAdminUser)
	} catch (error) {
		// console.log(error.name)
		if (error.name === 'MongoServerError' && error.code === 11000) {
			const field = Object.keys(error.keyValue)[0]
			if (field === 'userName') {
				return res
					.status(500)
					.json({ message: '중복된 유저명 입니다.' })
			} else if (field === 'phoneNumber') {
				return res
					.status(500)
					.json({ message: '중복된 전화번호 입니다.' })
			}
		}

		return res.status(500).json(error)
	}
})

adminAuthRouter.post('/updateadmininfo', async (req, res) => {
	try {
		const updateAdminUserData = req.body

		console.log('updateAdminUserData', updateAdminUserData)
		const adminUser = await Admin.findById(updateAdminUserData.id)
		if (!adminUser) {
			return res.status(404).json({
				message: '유저 정보를 찾을 수 없습니다.',
			})
		}

		// 패스워드 업데이트
		if (updateAdminUserData.password) {
			const password = updateAdminUserData.password
			const encryptedPassword = await hashedPassword(password)
			adminUser.password = encryptedPassword
		}

		// 한국이름 업데이트
		if (updateAdminUserData.koreanName) {
			adminUser.koreanName = updateAdminUserData.koreanName
		}

		// 영어이름 업데이트

		if (updateAdminUserData.firstName) {
			adminUser.firstName = updateAdminUserData.firstName
		}

		if (updateAdminUserData.lastName) {
			adminUser.lastName = updateAdminUserData.lastName
		}

		// 이메일 업데이트

		if (updateAdminUserData.email) {
			adminUser.email = updateAdminUserData.email
		}

		// 전화번호 업데이트(중복 체크 포함)
		if (updateAdminUserData.phoneNumber) {
			adminUser.phoneNumber = updateAdminUserData.phoneNumber
		}

		await adminUser.save()
		return res.status(200).json({ message: '저장 완료' })
	} catch (error) {
		if (error.name === 'MongoServerError' && error.code === 11000) {
			const field = Object.keys(error.keyValue)[0]
			if (field === 'email') {
				return res
					.status(500)
					.json({ message: '중복된 이메일 입니다.' })
			}

			if (field === 'phoneNumber') {
				return res
					.status(500)
					.json({ message: '중복된 전화번호 입니다.' })
			}
		}

		return res.status(500).json({
			error,
		})
	}
})

adminAuthRouter.get('/updateaccesstoken', async (req, res) => {
	try {
		const refreshTokenSecretKey = config.refreshTokenSecretKey
		const headers = req.headers
		const refreshToken = headers.cookie.split('refreshToken=')[1]
		const decodedResult = verifyToken(refreshToken, refreshTokenSecretKey)

		const payload = {
			id: decodedResult.id,
			userName: decodedResult.userName,
			grade: decodedResult.grade,
		}
		const newAccessToken = generateAccessToken(payload)
		return res
			.status(200)
			.header('Authorization', `Bearer ${newAccessToken}`)
			.json({ message: 'Access Token 재발급' })
	} catch (error) {
		return res.status(500).json({
			error,
		})
	}
})

export default adminAuthRouter
