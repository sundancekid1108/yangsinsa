import Mongoose from 'mongoose'
import constants from '../../../constant/constant.js'
const Schema = Mongoose.Schema

const StoreAdminSchema = new Schema(
	{
		userName: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			required: true,
			minLength: [4, '유저명은 4~30글자까지 가능합니다.'],
			maxLength: [30, '유저명은 4~30글자까지 가능합니다.'],
			match: [
				constants.REGEX.ENG_NUMBER_REGEX,
				'영어, 숫자 조합으로 4~30자까지 입력 가능합니다.',
			],
		},

		password: {
			type: String,
			required: true,
		},
		koreanName: {
			type: String,
			required: true,
			maxLength: [30, '이름은 최대 30글자까지 가능합니다.'],
			match: [
				constants.REGEX.KOR_REGEX,
				'이름은 한글만 입력 가능합니다.',
			],
		},

		firstName: {
			type: String,
			trim: true,
			uppercase: true,
			maxLength: [50, '영문 성명은  최대 50글자까지 가능합니다.'],
			match: [constants.REGEX.ENG_REGEX, '영어로 입력해주세요'],
		},
		lastName: {
			type: String,
			trim: true,
			uppercase: true,
			maxLength: [50, '영문 성명은  최대 50글자까지 가능합니다.'],
			match: [constants.REGEX.ENG_REGEX, '영어로 입력해주세요'],
		},
		phoneNumber: {
			type: String,
			unique: true,
			required: true,
			maxLength: [20, '전화번호를 확인 해주세요.'],
			match: [
				constants.REGEX.MOBILEPHONE_REGEX,
				'전화번호는 숫자만 입력 가능합니다.',
			],
		},

		email: {
			type: String,
			trim: true,
			unique: true,
			sparse: true,
			lowercase: true,
			match: [
				constants.REGEX.EMAIL_REGEX,
				'유효한 이메일 형식이 아닙니다.',
			],
		},

		isActive: {
			type: Boolean,
			default: true,
			required: true,
		},

		grade: {
			type: String,
			enum: {
				values: [
					constants.STORE_ADMIN_GRADE.SERVICE,
					constants.STORE_ADMIN_GRADE.MAINTENANCE,
				],
				message: '카테고리가 유효하지 않습니다.',
			},
			default: constants.STORE_ADMIN_GRADE.SERVICE,
		},

		avatar: {
			type: String,
			default: '',
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

const StoreAdmin = Mongoose.model('StoreAdmin', StoreAdminSchema)
export default StoreAdmin
