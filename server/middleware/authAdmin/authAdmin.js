const authAdmin = (req, res, next) => {
	console.log(req.decoded)
	const adminGrade = req.decoded.adminGrade

	if(adminGrade){
		next()
	} else {
		return res.status(403).json({message: '어드민 권한이 없습니다.'});
	}

};

const authUser = (req,res, next) => {
	console.log("authadmin", req)
	next()
}

export {authAdmin,authUser }