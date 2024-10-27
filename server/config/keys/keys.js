import dotenv from 'dotenv';
dotenv.config();

const keys = {
    port: process.env.PORT || 3001,
    apiURL: `${process.env.API_URL}`,
    database: {
        url: process.env.MONGO_URL
    },
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
        tokenLife: '7d',
        refreshTokenLife: "14d"
    }
};

export default keys