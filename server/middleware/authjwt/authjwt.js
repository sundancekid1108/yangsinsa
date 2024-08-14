import passport from "passport";

// JWT 인증 미들웨어
const authJwt = passport.authenticate("jwt", { session: false });

export default authJwt;
