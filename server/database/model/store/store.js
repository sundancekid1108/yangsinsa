import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
const Schema = Mongoose.Schema;

// Merchant Schema
const StoreSchema = new Schema({
    storeName: {
        type: String,
        trim: true
    },
    storeEmail: {
        type: String
    },
    storePhoneNumber: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        default: null
    },
    status: {
        type: String,
        default: constants.STATUS.HOLD,
        enum: [
            constants.HOLD.Waiting_Approval,
            constants.HOLD.Rejected,
            constants.HOLD.Approved
        ]
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

const Store = Mongoose.model('Store', StoreSchema);
export default Store;
