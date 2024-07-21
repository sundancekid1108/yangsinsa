import dotenv from 'dotenv';
dotenv.config();

const keys = {
    port: process.env.PORT || 3001,
    database: {
        url: process.env.MONGO_URL
    },
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
        tokenLife: '7d'
    }
};

export default keys