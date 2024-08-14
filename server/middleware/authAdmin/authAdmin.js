const authAdmin =
	(...roles) =>
	(req, res, next) => {
		if (!req.user) {
			return res.status(401).send("Unauthorized");
		}

		const isAdmin = roles.find(
			(adminGrade) => req.user.adminGrade === adminGrade
		);
		if (!isAdmin) {
			return res.status(403).send("You are not allowed to make this request.");
		} else {
			return next();
		}
	};
export default authAdmin;
