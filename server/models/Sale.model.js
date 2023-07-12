import { Double, Int32, ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const SaleSchema = new Schema({
	saleDate: {
		type: Date,
		required: true,
	},
	SaleProducts: [
		{
			soldProductName: {
				type: String,
				required: true,
			},
			soldProductQuantity: {
				type: Number,
				required: true,
			},
			soldProductAmountCollected: {
				type: Number,
				required: true,
			},
			soldProductId : {
				type : ObjectId,
				required : true
			}
		},
	],
});

export default model("Sale", SaleSchema);
