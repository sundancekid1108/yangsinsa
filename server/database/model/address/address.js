import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
const Schema = Mongoose.Schema;

const addressSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		address1: {
			type: String,
			rim: true,
		},
		address2: {
			trim: true,
			type: String,
		},
		city: {
			trim: true,
			type: String,
		},
		state: {
			trim: true,
			type: String,
		},
		country: {
			trim: true,
			type: String,
		},
		zipCode: {
			trim: true,
			type: String,
		},
		isDefault: {
			type: Boolean,
			default: false,
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

const Address = Mongoose.model('Address', addressSchema);
export default Address;
