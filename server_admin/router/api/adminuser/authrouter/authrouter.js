import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import passport from 'passport';
import AdminUser from '../../../../database/model/adminuser/adminuser.js';
import keys from '../../../../config/keys/keys.js';
import constants from '../../../../constants/constants.js'

const authRouter = express.Router();


export default authRouter