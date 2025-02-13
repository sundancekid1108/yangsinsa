import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const ReviewSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		default: null,
	},

	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		default: null,
	},

	title: {
		type: String,
		trim: true,
	},
	rating: {
		type: Number,
		default: 0,
	},
	review: {
		type: String,
		trim: true,
	},
	isRecommended: {
		type: Boolean,
		default: true,
	},
});

const Review = Mongoose.model('Review', ReviewSchema);
export default Review;
