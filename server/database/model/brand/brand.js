import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js';
const Schema = Mongoose.Schema;

const brandSchema = new Schema(
	{
		brandName: {
			type: String,
			trim: true,
		},
		brandEngName: {
			type: String,
			trim: true,
		},

		image: {
			data: Buffer,
			contentType: String,
		},
		brandDescription: {
			type: String,
		},
		isActive: {
			type: Boolean,
			default: true,
		},

		store: {
			type: Schema.Types.ObjectId,
			ref: 'Store',
			default: null,
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

const Brand = Mongoose.model('Brand', brandSchema);
export default Brand;
