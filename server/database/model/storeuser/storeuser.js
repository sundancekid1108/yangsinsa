import Mongoose from "mongoose";
import constants from "../../../constants/constants.js";
const Schema = Mongoose.Schema;

const StoreUserSchema = new Schema(
	{
		userName: {
			type: String,
			trim: true,
			unique: true,
			required: true,
		},

		password: {
			type: String,
			required: true,
		},

		firstName: {
			type: String,
			trim: true,
			required: true,
		},
		lastName: {
			type: String,
			trim: true,
			required: true,
		},

		phoneNumber: {
			type: String,
			unique: true,
			required: true,
		},

		email: {
			type: String,
			trim: true,
			unique: true,
			required: true,
		},

		adminGrade: {
			type: String,
			enum: [constants.ADMIN_LEVEL.ADMIN, constants.ADMIN_LEVEL.SUPER_ADMIN],
			default: constants.ADMIN_LEVEL.ADMIN,
		},

		avatar: {
			type: String,
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
);

const StoreUser = Mongoose.model("StoreUser", StoreUserSchema);
export default StoreUser;

/* required 속성에 할당된 함수는 provider 필드의 값이 'email'이 아닌 경우 false를, 그렇지 않은 경우 true
사용자가 이메일과 비밀번호로 회원가입하는 경우, provider 필드는 'email'로 설정
사용자가 Google 계정으로 로그인하는 경우, provider 필드는 'google'로 설정, 소셜 로그인 처리 */
