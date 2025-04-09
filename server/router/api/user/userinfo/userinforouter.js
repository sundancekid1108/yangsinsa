import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import passport from 'passport';
import User from '../../../../database/model/user/user.js';
import keys from '../../../../config/keys/keys.js';
import constants from '../../../../constants/constants.js';
import {
	generateToken,
	generateRefreshToken,
} from '../../../../utils/generatetoken/generatetoken.js';

const userInfoRouter = express.Router();

userInfoRouter.post('/updateuserinfo', async (req, res) => {});

userInfoRouter.get('/userinfo', async (req, res) => {});

export default userInfoRouter;
