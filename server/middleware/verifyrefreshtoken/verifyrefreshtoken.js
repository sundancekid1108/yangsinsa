import Token from "../../database/model/token/RefreshToken.js";

const verifyRefreshToken = (req, res, next) => {
	try {
		const decodedUser = req.decoded;
		const userId = decodedUser._id;
		console.log();
		//accesstoken만료, refreshtoekn만료아님

		//accesstoken만료, refreshtoken만료
		return res.status(403).json({
			response: "토큰 만료",
		});
	} catch (error) {
		return res.status(500).json({
			response: false,
			error: error,
		});
	}
};

export default verifyRefreshToken;
