import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
const Schema = Mongoose.Schema;

const addressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    zipCode: {
        type: String
    },
    isDefault: {
        type: Boolean,
        default: false
    },

    updatedDate: Date,

    createdDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }, { versionKey: false });

const Address = Mongoose.model('Address', addressSchema);
export default Address;
