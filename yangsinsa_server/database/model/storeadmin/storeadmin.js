import Mongoose from 'mongoose';
import constants from '../../../constant/constant.js';
const Schema = Mongoose.Schema;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

const StoreAdminSchema = new Schema(
	{
		userName: {
			type: String,
			trim: true,
            lowercase: true,
			unique: true,
			required: true,
            match: [ /[a-z0-9_]{4,30}/, '영어, 숫자 조합으로 4~30자까지 입력 가능합니다.']
		},

		password: {
			type: String,
			required: true,
		},
		koreanName: {
			type: String,
            required: true,
            match: [ /[ㄱ-ㅎ|가-힣_]{1,30}/, '이름은 한글만 입력 가능합니다.']
		},

		firstName: {
            type: String,
            trim: true,
            uppercase: true,
            match: [/[a-zA-Z_]{1,50}/, '영어만 입력']
		},
		lastName: {
            type: String,
            trim: true,
            uppercase: true,
            match: [/[a-zA-Z_]{1,50}/, '영어만 입력']
		},
		phoneNumber: {
            type: String,
            unique: true,
            required: true,
            match: [/[0-9]{3,20}$/, '전화번호는 숫자만 입력 가능합니다.'],
		},

        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            lowercase: true,
            match: [emailRegex, '유효한 이메일 형식이 아닙니다.']
        },

		isActive: {
			type: Boolean,
			default: true,
            required: true,
		},

		supervisorType: {
			type: String,
			enum: [
				constants.SUPERVISOR_TYPE.SERVICE,
				constants.SUPERVISOR_TYPE.MAINTENANCE,
			],
			default: constants.SUPERVISOR_TYPE.SERVICE,
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
	{ versionKey: false },
);

const StoreAdmin = Mongoose.model('StoreAdmin', StoreAdminSchema);
export default StoreAdmin;
