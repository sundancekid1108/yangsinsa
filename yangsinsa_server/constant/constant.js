const constants = {
	USER_GRADE: {
		SILVER: 'silver',
		GOLD: 'gold',
		PLATINUM: 'platinum',
	},

	MAIL_PROVIDER: {
		EMAIL: 'email',
		GOOGLE: 'google',
	},

	STATUS: {
		CANCELLED: 'cancelled',
		APPROVED: 'approved',
		HOLD: 'hold',
	},

	ADMIN_LEVEL: {
		SUPER_ADMIN: 'superadmin',
		ADMIN: 'admin',
	},

	ADMIN_GRADE: {
		SUPER_ADMIN: 'superadmin',
		ADMIN: 'admin',
	},

	SUPERVISOR_GRADE: {
		SERVICE: 'service',
		MAINTENANCE: 'maintenance',
	},

	SOCIAL_PROFILE: {
		NAVER: 'naver',
		KAKAO: 'kakao',
		GOOGLE: 'google',
	},

	JWT_COOKIE: 'x-jwt-cookie',

	REGEX: {
		EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
		MOBILEPHONE: /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/,
		ENG_NUMBER_REGEX: /^[a-zA-Z0-9]+$/,
		ENG_REGEX: /^[a-zA-Z]*$/,
		KOR_REGEX: /^[가-힣]+$/,
		NUMBER_REGEX: /^[0-9]+$/,
		PASSWORD_REGEX:
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{8,}).*$/,
	},
}

export default constants
