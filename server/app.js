import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import passport from 'passport';
import dbConnect from './database/config.js';
import keys from './config/keys/keys.js';
import router from './router/router.js';

dotenv.config();

const PORT = keys.port;

const app = express();

app.use(
	cors({
		origin: true,
		credentials: true,
		exposedHeaders: ['Authorization'],
	}),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
	console.log(
		`Backend Server on Listening on port ${PORT}. Check http://localhost:${PORT}/ `,
	);
});

app.use(router);

dbConnect();
