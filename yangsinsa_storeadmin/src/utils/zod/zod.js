import { z } from 'zod'
import constants from '../constants/constants.js'

const loginSchema = z.object({
	userName: z
		.string()
		.min(1, { message: '아이디를 확인해주세요.' })
		.max(40, { message: '아이디를 확인해주세요.' }),
	password: z
		.string()
		.regex(constants.REGEX.PASSWORD_REGEX, {
			message:
				'영문 대문자, 소문자, 숫자, 특수문자 포함 8자리 이상 입력해주세요.',
		})
		.min(1, { message: '비밀번호를 확인해주세요.' })
		.max(40, { message: '비밀번호를 확인해주세요.' }),
})

const signUpSchema = z.object({
	userName: z
		.string()
		.min(1, { message: '아이디를 확인해주세요.' })
		.max(40, { message: '아이디를 확인해주세요.' }),
	password: z
		.string()
		.regex(constants.REGEX.PASSWORD_REGEX, {
			message:
				'영문 대문자, 소문자, 숫자, 특수문자 포함 8자리 이상 입력해주세요.',
		})
		.min(1, { message: '비밀번호를 확인해주세요.' })
		.max(40, { message: '비밀번호를 확인해주세요.' }),
	koreanName: z
		.string()
		.regex(constants.REGEX.KOR_REGEX, { message: '한글로 입력해주세요.' })
		.min(1, { message: '이름을 확인해주세요.' })
		.max(40, { message: '이름을 확인해주세요.' }),

	phoneNumber: z.string().min(1, { message: '전화번호를 확인해주세요.' }),
})

export { loginSchema, signUpSchema }
