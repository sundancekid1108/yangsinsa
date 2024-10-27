
import passport from "passport";
import { jwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import keys from "../../config/keys/keys.js";

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.jwt.secret,
};

//Jwt stragey
passport.use(
	new Strategy(jwtOptions, (jwtPayload, done) => {
		console.log("jwtPayload", jwtPayload);
	})
);
