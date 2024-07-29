import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
const Schema = Mongoose.Schema;

const productSchema = new Schema({

    updatedDate: Date,

    createdDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }, { versionKey: false });

const Product = Mongoose.model('Product', productSchema);
export default Product;