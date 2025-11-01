import Mongoose from 'mongoose'
import constants from '../../../constant/constant.js'
const Schema = Mongoose.Schema

const ItemSchema = new Schema({
	itemName: {
		type: String,
		trim: true,
		lowercase: true,
	},
	itemEngName: {
		type: String,
		trim: true,
		lowercase: true,
	},
	gender: {},
})

const Item = Mongoose.model('Item', ItemSchema)
export default Item
