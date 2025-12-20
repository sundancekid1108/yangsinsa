const constants = {
	REGEX: {
		EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		MOBILE_PHONE_REGEX: /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/,
		ENG_NUMBER_REGEX: /^[a-zA-Z0-9]+$/,
		ENG_REGEX: /^[a-zA-Z]*$/,
		KOR_NUMBER_REGEX: /[가-힣0-9]+/,
		KOR_REGEX: /^[가-힣]+$/,
		NUMBER_REGEX: /^[0-9]+$/,
		PASSWORD_REGEX:
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{8,}).*$/,
	},
}

export default constants
