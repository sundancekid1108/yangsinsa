import Mongoose from "mongoose";

const Schema = Mongoose.Schema;

const refreshTokenSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
			unique: true
		},
		refreshToken: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

const RefreshToken = Mongoose.model('RefreshToken', refreshTokenSchema)
export default RefreshToken