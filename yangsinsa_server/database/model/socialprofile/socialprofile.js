import Mongoose from 'mongoose'
import constants from '../../../constants/constants.js'
import mongoose from 'mongoose'

const Schema = Mongoose.Schema

const SocialProfileSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},

	platformType: {
		type: [String],
	},
})

const SocialProfile = mongoose.model('SocialProfile', SocialProfileSchema)
export default SocialProfile
