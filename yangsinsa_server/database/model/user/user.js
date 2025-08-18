import Mongoose from 'mongoose'
import constants from '../../../constant/constant.js'
import { type } from 'os'
const Schema = Mongoose.Schema

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const userSchema = new Schema(
	{
		email: {
			type: String,
			trim: true,
			unique: true,
			required: true,
			sparse: true,
			lowercase: true,
			match: [emailRegex, '유효한 이메일 형식이 아닙니다.'],
		},

		password: {
			type: String,
			required: true,
		},

		userName: {
			type: String,
			trim: true,
			required: true,
			lowercase: true,
			unique: true,
		},

		koreanName: {
			type: String,
			required: true,
			match: [/[ㄱ-ㅎ|가-힣_]{1,30}/, '이름은 한글만 입력 가능합니다.'],
		},

		firstName: {
			type: String,
			trim: true,
			uppercase: true,
			match: [/[a-zA-Z_]{1,50}/, '영어로 입력해주세요.'],
		},
		lastName: {
			type: String,
			trim: true,
			uppercase: true,
			match: [/[a-zA-Z_]{1,50}/, '영어로 입력해주세요.'],
		},

		phoneNumber: {
			type: String,
			unique: true,
			required: true,
			match: [/[0-9]{3,20}$/, '전화번호는 숫자만 입력 가능합니다.'],
		},
		avatar: {
			type: String,
			default: '',
		},

		grade: {
			type: String,
			enum: {
				values: [
					constants.USER_GRADE.SILVER,
					constants.USER_GRADE.GOLD,
					constants.USER_GRADE.PLATINUM,
				],
				message: '카테고리가 유효하지 않습니다.',
			},
			default: constants.USER_GRADE.SILVER,
		},

		isActive: {
			type: Boolean,
			default: true,
		},

		updatedDate: {
			type: Date,
			default: Date.now,
		},

		createdDate: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true },
	{ versionKey: false }
)

const User = Mongoose.model('User', userSchema)
export default User

/* required 속성에 할당된 함수는 provider 필드의 값이 'email'이 아닌 경우 false를, 그렇지 않은 경우 true
사용자가 이메일과 비밀번호로 회원가입하는 경우, provider 필드는 'email'로 설정
사용자가 Google 계정으로 로그인하는 경우, provider 필드는 'google'로 설정, 소셜 로그인 처리 */
