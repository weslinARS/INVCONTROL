import Product from "../models/Product.model.js";
import { validationResult } from "express-validator";
export const getProducts = async (request, response) => {
	try {
		const productsArray = await Product.find();
		response.status(200).json(productsArray);
	} catch (error) {
		console.error(error.message);
		return response.status(500).json({ message: error.message });
	}
};
export const createProduct = async (request, response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(400).json({ errors: errors.array() });
	}
	try {
		const product = request.body;
		const newProduct = new Product(product);
		const productSave = await newProduct.save();
		return response.status(201).json(productSave);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};

export const updateProduct = async (request, response) => {
	const error = validationResult(request);
	if (!error.isEmpty()) {
		return response.status(400).json({ errors: error.array() });
	}
	try {
		const productUpdated = await Product.findByIdAndUpdate(
			request.params.id,
			request.body,
			{ new: true }
		);
		return response.status(200).json(productUpdated);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};

export const deleteProduct = async (request, response) => {
	try {
		const productDeleted = await Product.findByIdAndDelete(
			request.params.id
		);
		return response.status(200).json(productDeleted);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
export const getProduct = async (request, response) => {
	try {
		const productFound = await Product.findById(request.params.id);
		if (!productFound)
			return response.status(404).json({ message: "Product not found" });
		return response.status(200).json(productFound);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
