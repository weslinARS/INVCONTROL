import { validationResult } from "express-validator";
import Sales from "../models/Sale.model.js";

export const getSales = async (request, response) => {
	try {
		const sales = await Sales.find();
		response.status(200).json(sales);
	} catch (error) {
		response.status(404).json({ message: error.message });
	}
};
export const getSale = async (request, response) => {
	try {
		const saleFound = await Sales.findById(request.params.id);
		if (!saleFound)
			return response.status(404).json({ message: "Sale not found" });
		return response.status(200).json(saleFound);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};

export const createSale = async (request, response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty())
		return response.status(422).json({ errors: errors.array() });
	try {
		const { saleDate, SaleProducts } = request.body;
		const newSale = new Sales({ saleDate, SaleProducts });
		const saleCreated = await newSale.save();
		return response.status(201).json(saleCreated);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
export const deleteSale = async (request, response) => {
	try {
		const saleFound = await Sales.findByIdAndDelete(request.params.id);
		if (!saleFound)
			return response.status(404).json({ message: "Sale not found" });
		return response.status(200).json({ message: "Sale deleted" });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
