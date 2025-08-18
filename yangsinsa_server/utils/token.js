import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const accessTokenSecretKey = config.accessTokenSecretKey
const refreshTokenSecretKey = config.refreshTokenSecretKey
const accessTokenLife = config.accessTokenLife
const refreshTokenLife = config.refreshTokenLife

const generateAccessToken = (payload) => {
	const accessToken = jwt.sign(payload, accessTokenSecretKey, {
		algorithm: 'HS256',

		expiresIn: accessTokenLife,
	})
	return accessToken
}

const generateRefreshToken = (payload) => {
	const refreshToken = jwt.sign(payload, refreshTokenSecretKey, {
		algorithm: 'HS256',

		expiresIn: refreshTokenLife,
	})
	return refreshToken
}

const verifyToken = (token, key) => {
	const decodedResult = jwt.verify(token, key) // JWT를 검증합니다.
	return decodedResult
}

export { generateAccessToken, generateRefreshToken, verifyToken }
