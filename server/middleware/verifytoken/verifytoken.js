import jwt from 'jsonwebtoken';
import keys from '../../config/keys/keys.js';

const accessTokenSecret = keys.accessTokenSecret;
const refreshTokenSecret = keys.refreshTokenSecret;
const accessTokenLife = keys.accessTokenLife;
const refreshTokenLife = keys.refreshTokenLife;

const checkValidateToken = (token, secretKey) => {
	try {
		const decoded = jwt.verify(token, secretKey); // JWT를 검증합니다.
		return decoded;
	} catch (error) {
		// console.log("error", error);
		return false;
	}
};

const verifyToken = async (req, res, next) => {
	try {
		const headers = req.headers;
		// console.log('headers', headers);

		if (!headers.authorization) {
			return res.status(403).json({ message: 'Access Token 없음' });
		}
		const accessToken = headers.authorization.split(' ')[1];
		const refreshToken = headers.cookie.split('refreshToken=')[1];

		const validateAccessToken = checkValidateToken(
			accessToken,
			accessTokenSecret,
		);
		const validateRefreshToken = checkValidateToken(
			refreshToken,
			refreshTokenSecret,
		);
		console.log('validateAccessToken', validateAccessToken);
		console.log('validateRefreshToken', validateRefreshToken);

		if (validateAccessToken) {
			console.log(validateAccessToken);
			req.body.decoded = validateAccessToken;
			next();
		} else {
			if (validateRefreshToken) {
				console.log('Access Token 만료');
				return res.status(401).json({ message: 'Access Token 만료' });
			} else {
				// accesstoken, refreshToken 만료> 로그아웃
				console.log("'Access Token, Refresh Token 만료'");
				return res
					.status(403)
					.json({ message: 'Access Token, Refresh Token 만료' });
			}
		}
	} catch (error) {
		console.log(error);
		return res.status(403).json(error);
	}
};

export default verifyToken;
