// 토큰 만료시간 체크
import { verifyToken } from '../../utils/token.js'
import config from '../../config/config.js'

const accessTokenSecretKey = config.accessTokenSecretKey
const refreshTokenSecretKey = config.refreshTokenSecretKey

const validateToken = (req, res, next) => {
	console.log('validateToken')
	const headers = req.headers

	if (!headers.authorization) {
		return res.status(401).json({
			message: 'No AccessToken',
		})
	}

	if (!headers.cookie) {
		return res.status(401).json({
			message: 'No RefreshToken',
		})
	}
	const accessToken = headers.authorization.split(' ')[1]
	const refreshToken = headers.cookie.split('refreshToken=')[1]

	const validateAccessToken = verifyToken(accessToken, accessTokenSecretKey)
	const validateRefreshToken = verifyToken(
		refreshToken,
		refreshTokenSecretKey
	)

	// console.log('validateAccessToken', validateAccessToken)
	// console.log('validateRefreshToken', validateRefreshToken)

	if (validateAccessToken) {
		console.log('Access Token 정상')
		req.body = validateAccessToken
		next()
	} else {
		if (validateRefreshToken) {
			// accesstoken 만료, refreshToken 만료 아님 >  accesstoken 재발급 진행
			console.log('Access Token 만료')
			return res.status(401).json({
				isAccessTokenExpired: true,
				isRefreshTokenExpired: false,
			})
		} else {
			// accesstoken 만료, refreshToken 만료 > 로그아웃
			console.log("'Access Token, Refresh Token 만료'")
			return res.status(401).json({
				isAccessTokenExpired: true,
				isRefreshTokenExpired: true,
			})
		}
	}
}

export default validateToken
