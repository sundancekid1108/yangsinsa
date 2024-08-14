import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
const Schema = Mongoose.Schema;

// Merchant Schema
const StoreSchema = new Schema({
	storeName: {
		type: String,
		trim: true,
	},

	storeDescription: {
		type: String,
		required: true,
	},
	storeEmail: {
		type: String,
		trim: true,
	},
	storePhoneNumber: {
		type: String,
	},

	businessRegistrationCode: {
		type: String,
	},

	storeAddress: {
		type: Schema.Types.ObjectId,
		ref: "Address",
		default: null,
	},

	isActivated: {
		type: Boolean,
		default: false,
	},
	brand: {
		type: Schema.Types.ObjectId,
		ref: "Brand",
		default: null,
	},
	status: {
		type: String,
		default: constants.STATUS.HOLD,
		enum: [
			constants.STATUS.CANCELLED,
			constants.STATUS.APPROVED,
			constants.STATUS.HOLD,
		],
	},
	updatedDate: {
		type: Date,
		default: Date.now,
	},

	createdDate: {
		type: Date,
		default: Date.now,
	},
});

const Store = Mongoose.model('Store', StoreSchema);
export default Store;
