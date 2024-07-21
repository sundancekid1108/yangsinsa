import mongoose from 'mongoose';
import ROLES from '../../../constants/constants.js'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: () => {
            return this.provider !== 'email' ? false : true;
        }
    },

    username: {
        type: String,
        required: true,
        lowercase: true,
        default: '',
        unique: true,
    },

    phoneNumber: {
        type: String,
        default: '',
        unique: true,
    },

    role: {
        type: String,
        default: ROLES.Member,
        enum: [ROLES.Admin, ROLES.Member, ROLES.Merchant]
    },

    created_date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }, { versionKey: false });

const User = mongoose.model('User', userSchema);
export default User;