import Mongoose from 'mongoose';
import constants from '../../../constant/constant.js';
const Schema = Mongoose.Schema;

const AdminSchema = new Schema(
	{
		userName: {
			type: String,
			trim: true,
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
			maximum: 100,
			trim: true,
            uppercase: true,
            match: [/[a-zA-Z_]{1,30}/, '영어만 입력']
		},
		lastName: {
			type: String,
			maximum: 100,
			trim: true,
            uppercase: true,
            match: [/[a-zA-Z_]{1,30}/, '영어만 입력']
		},

		phoneNumber: {
			type: String,
			unique: true,
			required: true,
			match: [/[0-9]{3,20}$/, '전화번호는 숫자만 입력 가능합니다.'],
		},

		adminGrade: {
			type: String,
			enum: [
				constants.ADMIN_LEVEL.ADMIN,
				constants.ADMIN_LEVEL.SUPER_ADMIN,
			],
			default: constants.ADMIN_LEVEL.ADMIN,
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
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
	{ versionKey: false },
);

const Admin = Mongoose.model('Admin', AdminSchema);
export default Admin;
