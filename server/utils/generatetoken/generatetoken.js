import jwt from 'jsonwebtoken';
import keys from '../../config/keys/keys.js';

const accessTokenSecret = keys.accessTokenSecret;
const refreshTokenSecret = keys.refreshTokenSecret;
const accessTokenLife = keys.accessTokenLife;
const refreshTokenLife = keys.refreshTokenLife;

const generateAccessToken = (payload) => {
	const accessToken = jwt.sign(payload, accessTokenSecret, {
		algorithm: 'HS256',

		expiresIn: accessTokenLife,
	});
	return accessToken;
};

const generateRefreshToken = (payload) => {
	const refreshToken = jwt.sign(payload, refreshTokenSecret, {
		algorithm: 'HS256',

		expiresIn: refreshTokenLife,
	});
	return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
