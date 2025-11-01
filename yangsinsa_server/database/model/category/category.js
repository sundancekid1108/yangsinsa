import Mongoose from 'mongoose'
import constants from '../../../constant/constant.js'
const Schema = Mongoose.Schema

const categorySchema = new Schema({
	gender: {},
	store: {},
	type: {},
})

const Category = Mongoose.model('Category', categorySchema)
export default Category
