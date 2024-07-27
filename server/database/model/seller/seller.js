import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
const Schema = Mongoose.Schema;

const sellerSchema = new Schema({
    name: {
        type: String,
        trim: true
    },

    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        default: null
    },

    status: {
        type: String,
        default: constants.SELLER_STATUS.WAITING_APPROVED,
        enum: [
            constants.SELLER_STATUS.Waiting_Approval,
            constants.SELLER_STATUS.Rejected,
            constants.SELLER_STATUS.Approved
        ]
    },

    updatedDate: Date,

    createdDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }, { versionKey: false });

const Seller = Mongoose.model('Seller', sellerSchema);
export default Seller;
