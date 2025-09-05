import bcrypt from 'bcryptjs'
import constant from '../constant/constant.js'

const validatePasswordType = (password) => {
	const passwordRegex = constant.REGEX.PASSWORD_REGEX
	return passwordRegex.test(password)
}

const hashedPassword = async (password) => {
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)

	return hash
}

const comparePassword = async (password1, password2) => {
	const result = await bcrypt.compare(password1, password2)
	return result
}

export { hashedPassword, comparePassword, validatePasswordType }
