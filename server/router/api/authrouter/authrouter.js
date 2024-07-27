import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import passport from 'passport';
import User from '../../../database/model/user/user.js';
import keys from '../../../config/keys/keys.js';
import constants from '../../../constants/constants.js'

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        /* 이메일, 패스워드 입력 확인 */
        if (!email || !password) {
            return res.status(400).json({
                error: "이메일, 패스워드를 확인해주세요."
            })
        }


        const user = await User.findOne({ email });


        if (!user) {
            return res.status(400).json({
                error: "존재하지 않는 계정입니다."
            })
        } else if (user.provider !== constants.MAILPROVIDER.EMAIL) {
            return res.status(400).json({
                error: "구글 계정으로 로그인하셔야 합니다."
            })
        }

        // 비밀번호 체크
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const secret = keys.jwt.secret;
            const tokenLife = keys.jwt.tokenLife;

            const payload = {
                id: user.id,
                email: user.email,
                userName: user.userName,
                role: user.role
            }

            const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

            if (!token) {
                throw new Error();
            }

            return res.status(200).json({
                success: true,
                token: `Bearer ${token}`,
                user: {
                    id: user.id,
                    email: user.email,
                    userName: user.userName,
                    role: user.role
                }


        })
        } else {
            return res.status(400).json({
                success: false,
                error: "이메일, 패스워드를 확인해주세요."
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
})


authRouter.post('/register', async (req, res) => {
    try {
        // 이메일 회원가입 구현
        const { email, userName, password } = req.body;

        // 이메일 체크
        if (!email) {
            return res
                .status(400)
                .json({ error: '이메일이 없습니다.' });
        } else {
            const dupulicateEmailUser = await User.findOne({ email });
            if (dupulicateEmailUser) {
                return res
                    .status(400)
                    .json({ error: '이미 등록된 이메일입니다.' });
            }
        }

        // 유저명 체크
        if (!userName) {
            return res.status(400).json({ error: '유저명이 없습니다.' });
        } else {
            const dupulicateUserName = await User.findOne({ userName });
            if (dupulicateUserName) {
                return res
                    .status(400)
                    .json({ error: '이미 등록된  유저명입니다.' });
            }
        }

        // 비밀번호 필드 체크
        if (!password) {
            return res.status(400).json({ error: '비밀번호가 없습니다.' });
        }


        const newUser = new User({
            email,
            password,
            userName

        });


        // 비밀번호 암호화
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            newUser.password = hash;
        }

        // 유저 정보 저장
        await newUser.save().then(user => {
            // console.log(user)
            return res.status(200).json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    userName: user.userName,
                    role: user.role
                }
            })
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error
        })
    }

})

export default authRouter