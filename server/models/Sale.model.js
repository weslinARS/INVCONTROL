import { Double, Int32, ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const SaleSchema = new Schema({
	saleDate: {
		type: Date,
		required: true,
	},
	saleTotalSales: {
		type: Number,
		required: true,
	},
	saleAmountCollected : {
		type : Number, 
		required : true
	},
	saleSellerId : {
		type : ObjectId,
		required : true
	},
	saleProducts: [
		{
			soldProductCategory:{
				type : String,
				required : true
			},
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
			},
		},
	],
});

export default model("Sale", SaleSchema);
