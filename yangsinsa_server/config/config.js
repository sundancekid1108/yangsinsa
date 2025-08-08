import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT,
    apiURL: process.env.API_URL,
    database: {
        url: process.env.MONGO_URL,
    },
    accessTokenSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    accessTokenLife: process.env.JWT_ACCESS_TOKEN_LIFE,
    refreshTokenLife: process.env.JWT_REFRESH_TOKEN_LIFE,
};

export default config;
