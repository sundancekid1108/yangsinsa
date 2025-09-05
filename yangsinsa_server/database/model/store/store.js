import Mongoose from 'mongoose'
import constants from '../../../constant/constant.js'
const Schema = Mongoose.Schema

const StoreSchema = new Schema(
	{
		storeName: {
			type: String,
			required: true,
			unique: true,
			maxLength: [30, '최대 30글자까지 가능합니다.'],
			match: [
				constants.REGEX.KOR_NUMBER_REGEX,
				'스토어명은 한글, 숫자만 입력 가능합니다.',
			],
		},

		storeEngName: {
			type: String,
			trim: true,
			uppercase: true,
			required: true,
			unique: true,
			maxLength: [30, '최대 30글자까지 가능합니다.'],
			match: [
				constants.REGEX.ENG_NUMBER_REGEX,
				'영문 스토어명은 영어, 숫자만 입력 가능합니다.',
			],
		},

		president: {
			type: String,
			required: true,
			maxLength: [30, '대표 성명은 최대 30글자까지 가능합니다.'],
			match: [
				constants.REGEX.KOR_REGEX,
				'대표자 성명은 한글만 입력 가능합니다.',
			],
		},

		description: {
			type: String,
			sparse: true,
			required: true,
			maxLength: [2000, '스토어 소개는 2000글자까지 가능합니다.'],
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

		storeImg: {
			type: String,
		},

		businessRegistrationCode: {
			type: String,
			unique: true,
			required: true,
			match: [
				/[0-9]{3,15}$/,
				'사업자 등록 번호는 숫자만 입력 가능합니다.',
			],
		},

		address: {
			type: Schema.Types.ObjectId,
			ref: 'Address',
			default: null,
		},

		isActivated: {
			type: Boolean,
			default: false,
		},
		status: {
			type: String,
			default: constants.STATUS.HOLD,
			enum: {
				values: [
					constants.STATUS.CANCELLED,
					constants.STATUS.APPROVED,
					constants.STATUS.HOLD,
				],
				message: '카테고리가 유효하지 않습니다.',
			},
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

const Store = Mongoose.model('Store', StoreSchema)
export default Store
