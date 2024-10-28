import jwt from "jsonwebtoken";
import RefreshToken from "../../database/model/refreshtoken/refreshtoken.js"
import keys from "../../config/keys/keys.js";

const secret = keys.jwt.secret;

const checkValidateToken = (token) =>{
    let decoded = null
    try {
        decoded = jwt.verify(token, secret); // JWT를 검증합니다.
        // console.log("decoded", decoded);
        if(decoded){
            return true
        }
    } catch (error) {
        // console.log("error", error);
        return false
    }
}


const verifyToken = async (req, res, next) => {
    //accesstoken 만료 refreshtoekn검증
    //accesstoken 만료 refreshtoken살아있으면
    //accesstoken 만료 refreshtoken만료 > 로그아웃

    try {
        const headers = req.headers
        const accessToken = headers.authorization?.split(' ')[1]

        const userId = req.body.id
        console.log("userId", userId)

        if (accessToken === undefined) {
            return res.status(401).json({error: '토큰 없음'})
        }

        if (accessToken) {
            //accesstoken 살아있으면 다음 단계 넘어감
            const isValidatedAccessToken = checkValidateToken(accessToken)
            // console.log(isValidatedAccessToken)
            if (isValidatedAccessToken) {
                req.decoded = jwt.verify(accessToken, secret)
                // return res.status(403).json({message: 'accesstoken 살아있음'})
                next()
            } else {
                const refreshToken = await RefreshToken.findOne({userId });
                console.log("refreshToken", refreshToken)
                const isValidatedRefreshToken = checkValidateToken(refreshToken.refreshToken)
                if (isValidatedRefreshToken){
                    //accesstoken 만료 refreshtoken살아있으면 새로운 accesstoken 발행
                    return res.status(403).json({message: 'accesstoken 만료, refreshtoken 살아있음'})

                } else {
                    //accesstoken 만료 refreshtoken만료 > 로그아웃, refreshToken 삭제
                    return res.status(403).json({error : 'accesstoken 만료, refreshtoken만료'})
                }


            }

        }


    } catch (error){
        return res.status(401).json({ error: '토큰 전송 오류' })
    }

}

export default verifyToken