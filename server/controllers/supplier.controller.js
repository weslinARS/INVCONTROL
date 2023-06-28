import Supplier from "../models/Supplier.model.js";
import { validationResult } from "express-validator";

export const getSuppliers = async (request, response) => {
	try {
		const suppliers = await Supplier.find();
		return response.status(200).json(suppliers);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
export const getSupplier = async (request, response) => {
	try {
		const supplierFound = await Supplier.findById(request.params.id);
		if (!supplierFound)
			return response.status(404).json({ message: "Supplier not found" });
		return response.status(200).json(supplierFound);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
export const createSupplier = async (request, response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty())
		return response.status(400).json({ errors: errors.array() });
	try {
		const { supplierName, supplierPhoneNumbers, supplierEmail } =
			request.body;
		const supplier = new Supplier({
			supplierName,
			supplierPhoneNumbers,
			supplierEmail,
		});
		const supplierCreated = await supplier.save();
		return response.status(201).json(supplierCreated);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};

export const deleteSupplier = async (request, response) => {
	try {
		const supplierDeleted = await Supplier.findByIdAndDelete(
			request.params.id
		);
		if (!supplierDeleted)
			return response.status(404).json({ message: "Supplier not found" });
		return response.status(200).json({ message: "Supplier deleted" });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
