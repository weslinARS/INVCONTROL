import { Double, ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
	orderDate: {
		type: Date,
		required: true,
	},
	orderDeliveryDate: {
		type: Date,
		required: true,
	},
	orderProducts: [
		{
			orderedProductId: {
				type: ObjectId,
				required: true,
			},
			orderedProductName: {
				type: String,
				required: true,
			},
			orderedProductQuantity: {
				type: Number,
				required: true,
			},
			orderedProductPrice: {
				type: Number,
				required: true,
			},
		},
	],
});

export default model("Order", OrderSchema);
