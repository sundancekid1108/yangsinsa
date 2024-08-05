import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
const Schema = Mongoose.Schema;

const CartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number,

    totalPrice: {
        type: Number,
        default: 0
    },

    updatedDate: {
        type: Date,
        default: Date.now
    },

    createdDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }, { versionKey: false });

const Cart = Mongoose.model('Cart', CartSchema);
export default Cart;