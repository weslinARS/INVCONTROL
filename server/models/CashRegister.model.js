import { Schema, model } from "mongoose";

//TODO: Finish cash register schema
const cashRegisterSchema = new Schema({
	startDate: {
		type: String,
		required: false,
	},
	startTime: {
		type: String,
		required: false,
	},
	endTime: {
		type: String,
		required: false,
		default: null,
	},
	startingAmount: {
		type: Number,
		required: true,
	},
	endingAmount: {
		type: Number,
		required: false,
		default: null,
	},
	totalSales: {
		type: Number,
		required: true,
    default: 0,
	},
});

export default model("CashRegister", cashRegisterSchema);
