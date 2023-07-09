import { Schema, model } from "mongoose";

//TODO: Finish cash register schema
const cashRegisterSchema = new Schema({
	startTime: {
		type: Date,
		required: false,
	},
	endTime: {
		type: Date,
		required: false,
	},
	startingAmount: {
		type: Number,
	},
	endingAmount: {
		type: Number,
		required: false,
	},
	totalSales: {
		type: Number,
		required: true,
    default: 0,
	},
});

export default model("CashRegister", cashRegisterSchema);
