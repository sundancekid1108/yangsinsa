import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js';
const Schema = Mongoose.Schema;

const AdminSchema = new Schema(
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
		koreanName: {
			type: String,
		},

		firstName: {
			type: String,
			trim: true,
		},
		lastName: {
			type: String,
			trim: true,
		},

		phoneNumber: {
			type: String,
			unique: true,
			required: true,
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
	},
	{ timestamps: true },
	{ versionKey: false },
);

const Admin = Mongoose.model('Admin', AdminSchema);
export default Admin;
