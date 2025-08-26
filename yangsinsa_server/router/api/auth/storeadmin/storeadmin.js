import express from 'express'
import { hashedPassword, comparePassword } from '../../../../utils/password.js'
import StoreAdmin from '../../../../database/model/storeadmin/storeadmin.js'
import config from '../../../../config/config.js'
import {
	generateAccessToken,
	generateRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
} from '../../../../utils/token.js'
import constant from '../../../../constant/constant.js'

const storeAdminAuthRouter = express.Router()

storeAdminAuthRouter.post('/login', async (req, res) => {
	try {
		const { userName, password } = req.body
		// 필수 필드 체크
		if (!userName || !password) {
			return res.status(400).json({
				message: '필수 필드를 확인해주세요.',
			})
		}
		const storeAdmin = await StoreAdmin.findOne({ userName: userName })

		//유저 등록 체크
		if (!storeAdmin) {
			return res.status(404).json({
				message: '등록되지 않은 유저입니다.',
			})
		}

		// 비밀번호 체크

		const isPasswordMatch = await comparePassword(
			password,
			storeAdmin.password
		)

		if (isPasswordMatch) {
			const payload = {
				id: storeAdmin.id,
				userName: storeAdmin.userName,
				grade: storeAdmin.grade,
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
storeAdminAuthRouter.post('/register', async (req, res) => {
	try {
		const { userName, password, koreanName, phoneNumber } = req.body

		// 필드 미입력 체크
		if (!userName || !password || !koreanName || !phoneNumber) {
			return res
				.status(400)
				.json({ message: '필수 필드를 입력해주세요.' })
		}

		// 유저명 중복 체크
		if (userName) {
			const isDuplicateUserName = await StoreAdmin.findOne({
				userName: userName,
			})
			if (isDuplicateUserName) {
				return res
					.status(400)
					.json({ message: '이미 등록된  유저명입니다.' })
			}
		}

		// 전화번호 중복 체크
		if (phoneNumber) {
			const isDuplicatePhoneNumber = await StoreAdmin.findOne({
				phoneNumber: phoneNumber,
			})
			if (isDuplicatePhoneNumber) {
				return res
					.status(400)
					.json({ message: '이미 등록된  전화번호입니다.' })
			}
		}

		// 패스워드 검증
		const passwordRegex = constant.REGEX.PASSWORD_REGEX
		const passwordCheck = passwordRegex.test(password)
		console.log(passwordCheck)
		if (!passwordCheck) {
			return res.status(400).json({
				message:
					'비밀번호는 영문, 숫자, 특수문자 조합으로 8자리 이상 입력 가능합니다.',
			})
		}

		//패스워드 암호화
		const encryptedPassword = await hashedPassword(password)

		// 유저 정보 생성
		const newStoreAdmin = await StoreAdmin.create({
			userName: userName,
			password: encryptedPassword,
			koreanName: koreanName,
			phoneNumber: phoneNumber,
		})

		// 유저 정보 저장
		await newStoreAdmin.save()
		return res.status(200).json({ message: '저장 완료' })
	} catch (error) {
		if (error.name === 'ValidationError') {
			// Mongoose validation errors (e.g., regex mismatch, required field missing)
			const errorMessage = Object.values(error.errors).map(
				(err) => err.message
			)
			return res.status(400).json({
				message: errorMessage,
			})
		} else if (error.name === 'MongoServerError' && error.code === 11000) {
			const field = Object.keys(error.keyValue)[0]
			if (field === 'userName') {
				return res
					.status(409)
					.json({ message: '중복된 유저명 입니다.' })
			} else if (field === 'phoneNumber') {
				return res
					.status(409)
					.json({ message: '중복된 전화번호 입니다.' })
			}
		}

		return res.status(500).json({
			error,
		})
	}
})

storeAdminAuthRouter.post('/updatestoreadmininfo', async (req, res) => {
	try {
		console.log(req.body)
		const updateStoreAdminData = req.body
		const storeAdmin = await StoreAdmin.findById(updateStoreAdminData.id)

		if (!storeAdmin) {
			return res.status(404).json({
				message: '유저 정보를 찾을 수 없습니다.',
			})
		}

		// 패스워드 업데이트
		if (updateStoreAdminData.password) {
			const password = updateStoreAdminData.password
			// 패스워드 검증
			const passwordRegex = constant.REGEX.PASSWORD_REGEX
			const passwordCheck = passwordRegex.test(password)

			if (!passwordCheck) {
				return res.status(400).json({
					message:
						'비밀번호는 영문, 숫자, 특수문자 조합으로 8자리 이상 입력 가능합니다.',
				})
			}
			const encryptedPassword = await hashedPassword(password)
			storeAdmin.password = encryptedPassword
		}

		// 한국이름 업데이트
		if (updateStoreAdminData.koreanName) {
			storeAdmin.koreanName = updateStoreAdminData.koreanName
		}

		// 영어이름 업데이트

		if (updateStoreAdminData.firstName) {
			storeAdmin.firstName = updateStoreAdminData.firstName
		}

		if (updateStoreAdminData.lastName) {
			storeAdmin.lastName = updateStoreAdminData.lastName
		}

		// 이메일 업데이트
		if (updateStoreAdminData.email) {
			storeAdmin.email = updateStoreAdminData.email
		}

		// 전화번호 업데이트(중복 체크 포함)
		if (updateStoreAdminData.phoneNumber) {
			storeAdmin.phoneNumber = updateStoreAdminData.phoneNumber
		}

		await storeAdmin.save()
		return res.status(200).json({ message: '저장 완료' })
	} catch (error) {
		if (error.name === 'ValidationError') {
			// Mongoose validation errors (e.g., regex mismatch, required field missing)
			const errorMessage = Object.values(error.errors).map(
				(err) => err.message
			)
			return res.status(400).json({
				message: errorMessage,
			})
		} else if (error.name === 'MongoServerError' && error.code === 11000) {
			const field = Object.keys(error.keyValue)[0]
			if (field === 'email') {
				return res
					.status(409)
					.json({ message: '중복된 이메일 입니다.' })
			}

			if (field === 'phoneNumber') {
				return res
					.status(409)
					.json({ message: '중복된 전화번호 입니다.' })
			}
		}
		return res.status(500).json({
			error,
		})
	}
})
storeAdminAuthRouter.get('/updateaccesstoken', async (req, res) => {
	try {
		const refreshTokenSecretKey = config.refreshTokenSecretKey
		const headers = req.headers
		const refreshToken = headers.cookie.split('refreshToken=')[1]
		const decodedResult = verifyRefreshToken(refreshToken)
		const payload = {
			id: decodedResult.id,
			userName: decodedResult.userName,
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

export default storeAdminAuthRouter
