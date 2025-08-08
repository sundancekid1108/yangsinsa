import express from 'express';
import bcrypt from 'bcryptjs';
import {hashedPassword, comparePassword} from '../../../../utils/password.js'
import {generateAccessToken, generateRefreshToken,} from '../../../../utils/token.js'
import Admin from '../../../../database/model/admin/admin.js'
import config from "../../../../config/config.js";
import jwt from "jsonwebtoken";

const adminAuthRouter = express.Router();

adminAuthRouter.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const {userName, password} = req.body;

        // 필수 필드 체크
        if (!userName || !password) {
            return res.status(401).json({
                message: '필수 필드를 확인해주세요.',
            });
        }

        const adminUser = await Admin.findOne({ userName: userName });
        console.log(adminUser);

        //유저 등록 체크
        if (!adminUser) {
            return res.status(404).json({
                message: '등록되지 않은 유저입니다.',
            });
        }

        // 비밀번호 체크


        const isPasswordMatch = await comparePassword(
            password,
            adminUser.password
        );

         console.log(isPasswordMatch);


        if (isPasswordMatch) {
            const payload = {
                id: adminUser.id,
                userName: adminUser.userName,
                adminGrade: adminUser.adminGrade,
            };

            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            return res.status(200).cookie('refreshToken', refreshToken, {
                httpOnly: true,
            })
                .header('Authorization', `Bearer ${accessToken}`)
                .json({
                    payload
            })

        } else {
            return res.status(401).json({
                message: '아이디, 패스워드를 확인해주세요.',
            });
        }

    } catch (error) {
        return res.status(500).json(
            error
        );
    }
})
adminAuthRouter.post('/register', async (req, res) => {
    try {
        console.log('body', req.body);
        const {userName, password, koreanName, phoneNumber} = req.body;

        // 필드 미입력 체크
        if (!userName || !password || !koreanName || !phoneNumber) {
            return res
                .status(400)
                .json({ message: '필수 필드를 입력해주세요.' });
        }

        // 유저명 중복 체크
        if (userName) {
            const dupulicateUserName = await Admin.findOne({
                userName: userName,
            });
            if (dupulicateUserName) {
                return res
                    .status(400)
                    .json({ message: '이미 등록된  유저명입니다.' });
            }
        }

        // 전화번호 중복 체크
        if (phoneNumber) {
            const dupulicateAdminUserPhoneNumber = await Admin.findOne({
                phoneNumber: phoneNumber,
            });
            if (dupulicateAdminUserPhoneNumber) {
                return res
                    .status(400)
                    .json({ message: '이미 등록된 전화번호입니다.' });
            }
        }

        //패스워드 암호화
        const encryptedPassword = await  hashedPassword(password)




        // 유저 정보 생성
        const newAdminUser = new Admin({
            userName: userName,
            password: encryptedPassword,
            koreanName: koreanName,
            phoneNumber: phoneNumber,
        });

        console.log("newAdminUser", newAdminUser);

        // 유저 정보 저장
        try {
            await newAdminUser.save()
            return res.status(200).json(newAdminUser);
        } catch (error) {

            if (error.name === 'ValidationError') {
                console.log('유효성 검사 오류가 발생했습니다.');
                for (let field in error.errors) {
                    console.log(`${field}: ${error.errors[field].message}`);
                    const errorMessage = error.errors[field].message;
                    return res.status(400).json(
                        {message: errorMessage }
                    );

                }
            } else {

                return res.status(500).json({
                    error
                });
            }
        }



    } catch (error) {
        return res.status(500).json({
            error
        });
    }
})
adminAuthRouter.post('/updateuserinfo', async (req, res) => {
    try {
        const updateAdminUserData = req.body;
        const adminUser = await Admin.findById(updateAdminUserData.id);
        if (!adminUser) {
            return res.status(404).json({
                error: '유저 정보를 찾을 수 없습니다.',
            })
        }

        // 패스워드 업데이트
        if (updateAdminUserData.password) {
            const password = updateAdminUserData.password;
            const encryptedPassword = await  hashedPassword(password)
            adminUser.password = encryptedPassword
        }

        //전화번호 업데이트(중복 체크 포함)
        if(updateAdminUserData.phoneNumber) {
            const checkDuplicatePhoneNumber = await Admin.findOne({phoneNumber: updateAdminUserData.phoneNumber});
            if (checkDuplicatePhoneNumber) {
                return res.status()
            }
        }


    } catch (error) {
        return res.status(500).json({
            error
        });

    }

})

adminAuthRouter.post('/updateuserpassword', async (req, res) => {
    try {
        const {password} = req.body;
        const encryptedPassword = await hashedPassword(password)



    } catch (error) {
        return res.status(500).json({
            error
        });

    }

})

adminAuthRouter.post('/logout', async (req, res) => {});

adminAuthRouter.get('/refreshtoken', async (req, res) => {
    try {
        const refreshTokenSecretKey = config.refreshTokenSecretKey
        const headers = req.headers;
        const refreshToken = headers.cookie.split('refreshToken=')[1];
        const decoded = jwt.verify(refreshToken, refreshTokenSecretKey); // JWT를 검증합니다.

        const payload = {
            id: decoded.id,
            userName: decoded.userName,
            adminGrade: decoded.adminGrade,
        };
        const newAccessToken = generateAccessToken(payload);
        return res
            .status(200)
            .header('Authorization', `Bearer ${newAccessToken}`)
            .json({ message: 'Access Token 재발급' });


    } catch (error) {
        return res.status(500).json({
            error
        });

    }
})


export default adminAuthRouter