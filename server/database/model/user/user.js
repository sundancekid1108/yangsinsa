import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
import { type } from 'os';
const Schema = Mongoose.Schema;

const userSchema = new Schema({


    email: {
        type: String,
        unique: true,
        required: () => {
            if (userSchema.provider === 'email') { return true } else { return false };

        }
    },
    provider: {
        type: String,
        default: constants.MAILPROVIDER.EMAIL,
        enum: [constants.MAILPROVIDER.EMAIL, constants.MAILPROVIDER.GOOGLE]
    },

    password: {
        type: String
    },

    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },

    phoneNumber: {
        type: String,
        unique: true,
    },
    avatar: {
        type: String
    },

    isSubscribed: {
        type: Boolean,
        default: false
    },

    grade: {
        type: String,
        enum: [constants.GRADE.SILVER, constants.GRADE.GOLD, constants.GRADE.PLATINUM],
        default: constants.GRADE.SILVER
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

const User = Mongoose.model('User', userSchema);
export default User;

/* required 속성에 할당된 함수는 provider 필드의 값이 'email'이 아닌 경우 false를, 그렇지 않은 경우 true
사용자가 이메일과 비밀번호로 회원가입하는 경우, provider 필드는 'email'로 설정
사용자가 Google 계정으로 로그인하는 경우, provider 필드는 'google'로 설정, 소셜 로그인 처리 */