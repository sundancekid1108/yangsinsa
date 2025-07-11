import dotenv from 'dotenv';
dotenv.config();

const keys = {
	port: process.env.PORT,
	apiURL: process.env.API_URL,
	database: {
		url: process.env.MONGO_URL,
	},
	accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
	refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
	accessTokenLife: process.env.JWT_ACCESS_TOKEN_LIFE,
	refreshTokenLife: process.env.JWT_REFRESH_TOKEN_LIFE,
};

export default keys;
