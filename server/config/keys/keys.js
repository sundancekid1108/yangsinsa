import dotenv from 'dotenv';
dotenv.config();

const keys = {
	port: process.env.PORT || 3001,
	apiURL: process.env.API_URL,
	database: {
		url: process.env.MONGO_URL,
	},
	jwt: {
		secret: process.env.JWT_SECRET_KEY,
		tokenLife: process.env.JWT_TOKEN_LIFE,
		refreshTokenLife: process.env.JWT_REFRESH_TOKEN_LIFE,
	},
};

export default keys;
