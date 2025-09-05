import Mongoose from 'mongoose'
import constants from '../../../constant/constant.js'
const Schema = Mongoose.Schema

const AuthoritySchema = new Schema({
	admin: {
		type: Schema.Types.ObjectId,
		ref: 'StoreAdmin',
		unique: true,
		required: true,
	},
	store: {
		type: Schema.Types.ObjectId,
		ref: 'Store',
		required: true,
	},
	type: {
		type: String,
		default: constants.STORE_ADMIN_GRADE.SERVICE,
		enum: {
			values: [
				constants.STORE_ADMIN_GRADE.SERVICE,
				constants.STORE_ADMIN_GRADE.MAINTENANCE,
				constants.STORE_ADMIN_GRADE.MERCHANDISER,
				constants.STORE_ADMIN_GRADE.SUPERVISOR,
			],
			message: '어드민 카테고리가 유효하지 않습니다.',
		},
	},
})

const Authority = Mongoose.model('Authority', AuthoritySchema)
export default Authority
