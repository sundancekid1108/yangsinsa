import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
const Schema = Mongoose.Schema;

const AdminUserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },

    admin: {
        type: String,
        enum: [constants.ADMIN_LEVEL.ADMIN, constants.ADMIN_LEVEL.SUPER_ADMIN],
        default: constants.ADMIN_LEVEL.ADMIN
    },


    avatar: {
        type: String
    },

    updatedDate: Date,

    createdDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }, { versionKey: false });

const AdminUser = Mongoose.model('AdminUser', AdminUserSchema);
export default AdminUser;