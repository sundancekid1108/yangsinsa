import jwt from 'jsonwebtoken';
import keys from '../../config/keys/keys.js';

const checkValidateToken = (token) => {
	try {
		const secret = keys.jwt.secret;
		const decoded = jwt.verify(token, secret); // JWT를 검증합니다.
		return decoded;
	} catch (error) {
		// console.log("error", error);
		return false;
	}
};

const verifyToken = async (req, res, next) => {
	try {
		const headers = req.headers;
		const accessToken = headers.authorization.split(' ')[1];
		const refreshToken = headers.cookie.split('refreshToken=')[1];
		// console.log(headers);

		const validateAccessToken = checkValidateToken(accessToken);
		const validateRefreshToken = checkValidateToken(refreshToken);
		// console.log(validateAccessToken);
		// console.log(validateRefreshToken);

		if (validateAccessToken) {
			next();
		} else {
			if (validateRefreshToken) {
				return res.status(401).json({ error: 'Access Token 만료' });
			} else {
				// 5. accesstoken, refreshToken 만료> 로그아웃
				return res
					.status(403)
					.json({ error: 'Access Token, Refresh Token 만료' });
			}
		}
	} catch (error) {
		return res.status(403).json(error);
	}
};

export default verifyToken;
