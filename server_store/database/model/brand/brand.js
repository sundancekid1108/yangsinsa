import Mongoose from 'mongoose';
import constants from '../../../constants/constants.js'
const Schema = Mongoose.Schema;

const brandSchema = new Schema({
    brandName: {
        type: String,
        trim: true
    },

    merchant: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant',
        default: null
    },

    updatedDate: Date,




    createdDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }, { versionKey: false });

const Brand = Mongoose.model('Brand', brandSchema);
export default Brand;

/* required 속성에 할당된 함수는 provider 필드의 값이 'email'이 아닌 경우 false를, 그렇지 않은 경우 true
사용자가 이메일과 비밀번호로 회원가입하는 경우, provider 필드는 'email'로 설정
사용자가 Google 계정으로 로그인하는 경우, provider 필드는 'google'로 설정, 소셜 로그인 처리 */