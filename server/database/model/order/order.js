import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
const Schema = Mongoose.Schema;

const OrderSchema = new Schema({
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    updatedDate: Date,

    createdDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }, { versionKey: false });

const Order = Mongoose.model('Order', OrderSchema);
export default Order;