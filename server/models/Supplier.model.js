import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const SupplierSchema = new Schema({
	supplierName: {
		type: String,
		required: true,
	},
	supplierPhoneNumbers: [
		{
			type: String,
			required: true,
		},
	],
	supplierEmail: [
		{
			type: String,
			required: true,
		},
	],
});

export default model("Supplier", SupplierSchema);
