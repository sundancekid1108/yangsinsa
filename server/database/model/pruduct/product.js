import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js';
const Schema = Mongoose.Schema;

const productSchema = new Schema(
	{
		brand: {
			type: Schema.Types.ObjectId,
			ref: 'Brand',
			default: null,
		},

		name: {
			type: String,
			trim: true,
			required: true,
		},

		slug: {
			type: String,
			slug: 'name',
			unique: true,
		},

		sku: {
			type: String,
		},

		imgURL: {
			type: String,
		},

		imageKey: {
			type: String,
		},

		description: {
			type: String,
			trim: true,
		},
		quantity: {
			type: Number,
		},
		price: {
			type: Number,
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
	{ versionKey: false },
);

const Product = Mongoose.model('Product', productSchema);
export default Product;
