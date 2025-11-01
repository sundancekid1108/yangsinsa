import Mongoose from 'mongoose'
import constants from '../../../constant/constant.js'
const Schema = Mongoose.Schema

const BrandSchema = new Schema({
	brandName: {
		type: String,
		trim: true,
	},
	brandEngName: {
		type: String,
		trim: true,
	},
})

const Brand = Mongoose.model('Brand', brandSchema)
export default Brand
