import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../../../database/model/user/user.js'
import { hashedPassword, comparePassword } from '../../../../utils/password.js'
import {
	generateAccessToken,
	generateRefreshToken,
	verifyToken,
} from '../../../../utils/token.js'
import config from '../../../../config/config.js'
import StoreAdmin from '../../../../database/model/storeadmin/storeadmin.js'

const userAuthRouter = express.Router()

userAuthRouter.post('/login', async (req, res) => {
	try {
		const { userName, password } = req.body

		/* 유저명, 패스워드 입력 확인 */
		if (!password || !userName) {
			return res.status(400).json({
				message: '유저명, 패스워드를 확인해주세요.',
			})
		}

		const user = await User.findOne({ userName: userName })

		if (!user) {
			return res.status(400).json({
				message: '존재하지 않는 계정입니다.',
			})
		}

		const passwordMatch = await bcrypt.compare(password, user.password)
		if (!passwordMatch) {
			return res.status(400).json({
				message: '아이디, 패스워드를 확인해주세요.',
			})
		} else {
			const payload = {
				id: user.id,
				userName: user.userName,
				role: user.role,
			}

			const token = generateAccessToken(payload)
			const refreshToken = generateRefreshToken(payload)

			return res
				.status(200)

				.cookie('refreshToken', refreshToken, {
					httpOnly: true,
				})
				.header('Authorization', `Bearer ${token}`)
				.json({ payload })
		}
	} catch (error) {
		return res.status(500).json({
			error,
		})
	}
})

userAuthRouter.post('/register', async (req, res) => {
	try {
		// 이메일 회원가입 구현
		const { userName, password, koreanName, phoneNumber, email } = req.body

		// 필드 체크
		if (!userName || !password || !koreanName || !phoneNumber || !email) {
			return res
				.status(400)
				.json({ message: '필수 필드를 입력해주세요.' })
		}

		// 비밀번호 암호화
		const encryptedPassword = await hashedPassword(password)

		const newUser = await User.create({
			userName: userName,
			password: encryptedPassword,
			koreanName: koreanName,
			phoneNumber: phoneNumber,
			email: email,
		})

		// 유저 정보 저장
		await newUser.save()
		return res.status(200).json({
			user: {
				id: newUser.id,
				email: newUser.email,
				userName: newUser.userName,
				koreanName: newUser.koreanName,
				role: newUser.role,
			},
		})
	} catch (error) {
		if (error.name === 'MongoServerError' && error.code === 11000) {
			const field = Object.keys(error.keyValue)[0]
			if (field === 'userName') {
				return res
					.status(500)
					.json({ message: '중복된 유저명 입니다.' })
			}

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

userAuthRouter.post('/updateuserinfo', async (req, res) => {
	try {
		const updateUserInfo = req.body
		const user = await User.findById(updateUserInfo.id)
		if (!user) {
			return res.status(404).json({
				message: '유저 정보를 찾을 수 없습니다.',
			})
		}

		// 패스워드 업데이트
		if (updateUserInfo.password) {
			const password = updateUserInfo.password
			const encryptedPassword = await hashedPassword(password)
			user.password = encryptedPassword
		}

		// 한국이름 업데이트
		if (updateUserInfo.koreanName) {
			user.koreanName = updateUserInfo.koreanName
		}

		// 영어이름 업데이트
		if (updateUserInfo.firstName) {
			user.firstName = updateUserInfo.firstName
		}

		if (updateUserInfo.lastName) {
			user.lastName = updateUserInfo.lastName
		}

		// 전화번호 업데이트
		if (updateUserInfo.phoneNumber) {
			user.phoneNumber = updateUserInfo.phoneNumber
		}

		//이메일 업데이트
		if (updateUserInfo.email) {
			user.email = updateUserInfo.email
		}

		await user.save()
		return res.status(200).json({ message: '저장 완료' })
	} catch (error) {
		// console.log(error);
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
userAuthRouter.get('/updateaccesstoken', async (req, res) => {
	try {
		const refreshTokenSecretKey = config.refreshTokenSecretKey
		const headers = req.headers
		const refreshToken = headers.cookie.split('refreshToken=')[1]
		const decodedResult = jwt.verify(refreshToken, refreshTokenSecretKey) // JWT를 검증합니다.

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

export default userAuthRouter
