import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";

const userInfoSchema = new Schema({
	userEmail: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	userLastName: {
		type: String,
		required: true,
	},
	userRole: {
		type: String,
		required: true,
		in: ["admin", "seller"],
	},
	userId: {
		type: ObjectId,
		required: true,
	},
});


export default model("UserInfo", userInfoSchema);
