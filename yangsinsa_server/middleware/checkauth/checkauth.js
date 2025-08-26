import config from '../../config/config.js'
import { verifyAccessToken, verifyRefreshToken } from '../../utils/token.js'

//어드민권한 확인
const checkAdminAuth = (req, res, next) => {
	// 권한 체크
	const grade = req.decode.grade
	if (grade) {
		next()
	} else {
		return res.status(403).json({ message: '권한이 없습니다.' })
	}
}

// 스토어 어드민 권한 확인
const checkStoreAdminAuth = (req, res, next) => {
	console.log('checkStoreAdminAuth')

	const grade = req.body.decoded.grade

	if (grade === 'service' || grade === 'maintenance') {
		next()
	} else {
		return res.status(403).json({ message: '권한이 없습니다.' })
	}
}

// 토큰 만료시간 체크
const validateTokenLifeTime = (req, res, next) => {
	console.log('validateTokenLifeTime')
	console.log('req.header', req.headers)
	const headers = req.headers
	const accessToken = headers.authorization.split(' ')[1]
	const refreshToken = headers.cookie.split('refreshToken=')[1]

	const validateAccessToken = verifyAccessToken(accessToken)
	const validateRefreshToken = verifyRefreshToken(refreshToken)

	console.log(validateAccessToken)

	if (validateAccessToken) {
		console.log('Access Token 정상')
		req.body.decoded = validateAccessToken
		next()
	} else {
		if (validateRefreshToken) {
			// accesstoken 만료, refreshToken 만료 아님 >  accesstoken 재발급 진행
			console.log('Access Token 만료')
			return res.status(401).json({ message: 'Access Token 만료' })
		} else {
			// accesstoken 만료, refreshToken 만료 > 로그아웃
			console.log("'Access Token, Refresh Token 만료'")
			return res
				.status(403)
				.json({ message: 'Access Token, Refresh Token 만료' })
		}
	}
}

export { checkAdminAuth, checkStoreAdminAuth, validateTokenLifeTime }
