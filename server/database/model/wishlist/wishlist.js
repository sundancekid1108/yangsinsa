import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
import { type } from 'os';
const Schema = Mongoose.Schema;

const WishListSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        default: null
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },

    createdDate: {
        type: Date,
        default: Date.now
    }

})

const WishList = Mongoose.model('WishList', WishListSchema);
export default WishList;