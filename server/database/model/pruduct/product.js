import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
const Schema = Mongoose.Schema;

const productSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        slug: 'name',
        unique: true
    },

    sku: {
        type: String
    },

    imgURL: {
        type: String
    },

    imageKey: {
        type: String
    },


    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        default: null
    },

    description: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
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

const Product = Mongoose.model('Product', productSchema);
export default Product;