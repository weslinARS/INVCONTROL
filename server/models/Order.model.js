import { ObjectId } from "mongodb";
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
	orderTotalOrderedProducts: {
		type: Number,
		required: true,
	},
	orderTotalPrice:{
		type: Number,
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
			orderedProductCategory: {
				type: String,
				required: true,
			},
		},
	],
});

export default model("Order", OrderSchema);
