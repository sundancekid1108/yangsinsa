// 토큰 만료시간 체크
const validateToken = (req, res, next) => {
	console.log('validateToken')
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
			return res
				.status(401)
				.json({
					isAccessTokenExpired: true,
					isRefreshTokenExpired: false,
				})
		} else {
			// accesstoken 만료, refreshToken 만료 > 로그아웃
			console.log("'Access Token, Refresh Token 만료'")
			return res
				.status(401)
				.json({
					isAccessTokenExpired: true,
					isRefreshTokenExpired: true,
				})
		}
	}
}

export default validateToken
