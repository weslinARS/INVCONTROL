import Product from "../models/Product.model.js";
import { adapedtObjectArray } from "../utilities/adapter.js";
import { validationResult } from "express-validator";
export const verifyStockPolicy = (product) =>{
    let {productStock, productStockPolicy} = product;
    return productStock >= productStockPolicy ;
}
export const getProducts = async (request, response) => {
	try {
		const productsArray = await Product.find({}).select("-__v");
		return response.status(200).json(productsArray);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
export const createProduct = async (request, response) => {
	try {
		let product = request.body;
		product.productIsOverPolicy = verifyStockPolicy(product);
		const newProduct = new Product({...product});
		const productSave = await newProduct.save();
		return response.status(201).json(productSave);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};

export const updateProduct = async (request, response) => {
	try {
		const productUpdated = await Product.findByIdAndUpdate(
			request.params.id,
			{...request.body, productIsOverPolicy: verifyStockPolicy(request.body)},
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
