import jwt from "jsonwebtoken";
import keys from "../../config/keys/keys.js";

const secret = keys.jwt.secret;
const tokenLife = keys.jwt.tokenLife;
const refreshTokenLife = keys.jwt.refreshTokenLife;


const generateToken = (payload) => {
    const token = jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: tokenLife})
        return token

}

const generateRefreshToken = (payload) => {
    const token = jwt.sign(payload, secret ,{
        algorithm: 'HS256',
        expiresIn: refreshTokenLife} )
    return token
}

export {generateToken, generateRefreshToken}