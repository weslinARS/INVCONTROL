import Product from "../models/Product.model.js";
import { adapedtObjectArray } from "../utilities/adapter.js";
import { validationResult } from "express-validator";
export const getProducts = async (request, response) => {
	try {
		const productsArray = await Product.find({}).select("-__v");
		return response.status(200).json(productsArray);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
export const createProduct = async (request, response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		const errorsArray = errors.array();
		errorsArray.map((error) => {
			console.log(error.msg);
		});
		const errorsArrayAdapted = errorsArray.map((error) => {
			return { field: error.path, message: error.msg };
		});
		return response.status(400).json({PropertiesErrors : errorsArrayAdapted});
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
		if (!productUpdated)
			return response
				.status(404)
				.json({ message: "No se encontro el producto a actualizar" });
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
		if (!productDeleted)
			return response
				.status(404)
				.json({ message: "producto no encontrado" });
		return response.status(200).json(productDeleted);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
export const getProduct = async (request, response) => {
	try {
		const productFound = await Product.findById(request.params.id, { __v });
		if (!productFound)
			return response.status(404).json({ message: "Product not found" });
		return response.status(200).json(productFound);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
