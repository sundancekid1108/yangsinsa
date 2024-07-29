import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import passport from 'passport';
import User from '../../../../database/model/user/user.js';
import keys from '../../../../config/keys/keys.js';
import constants from '../../../../constants/constants.js'

const authRouter = express.Router();


export default authRouter