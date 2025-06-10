import passport from 'passport';
import { jwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import keys from '../../config/keys/keys.js';
