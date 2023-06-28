import { validationResult } from "express-validator";
import Category from "../models/category.model.js";
export const getCategories = async (request, response) => {
	try {
		const categoriesArray = await Category.find();
		response.status(200).json(categoriesArray);
	} catch (error) {
		console.error(error.message);
		return response.status(500).json({ message: error.message });
	}
};
export const createCategory = async (request, response) => {
	let error = validationResult(request);
	if (!error.isEmpty()) {
		return response.status(400).json({ errors: error.array() });
	}
	try {
		const category = request.body;
		const newCategory = new Category(category);
		const categorySave = await newCategory.save();
		response.status(200).json(categorySave);
	} catch (error) {
		console.error(error.message);
		return response.status(500).json({ message: error.message });
	}
};

export const deleteCategory = async (request, response) => {
	try {
		const category = await Category.findByIdAndDelete(request.params.id);
		if (!category) {
			return response.status(404).json({ message: "Category not found" });
		}
		response.status(204).end();
	} catch (error) {
		console.error(error.message);
		return response.status(500).json({ message: error.message });
	}
};
