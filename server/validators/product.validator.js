import { body } from "express-validator";

const productValidator = () => {
	return [
		body("productName")
			.escape()
			.trim()
			.not()
			.isEmpty()
			.withMessage("el nombre del producto es requerido")
			.isString()
			.withMessage("el nombre del producto debe conetener solo letras"),
		body("productDescription")
			.escape()
			.trim()
			.not()
			.isEmpty()
			.withMessage("La descripción del producto es requerida"),
		body("productCategory")
			.escape()
			.trim()
			.not()
			.isEmpty()
			.withMessage("La categoría del producto es requerida"),
		body("productStock")
			.escape()
			.trim()
			.not()
			.isEmpty()
			.withMessage("El stock del producto es requerido")
			.isNumeric()
			.withMessage("El stock del producto debe ser un número")
			.isInt()
			.withMessage(`El stock del producto debe ser un número entero`),
		body("productPrice")
			.escape()
			.trim()
			.not()
			.isEmpty()
			.withMessage("El precio del producto es requerido")
			.isNumeric()
			.withMessage("El precio del producto debe ser un número"),
		body("productStockPolicy")
			.escape()
			.trim()
			.not()
			.isEmpty()
			.withMessage("La política de stock del producto es requerida")
			.isNumeric()
			.withMessage("La política de stock del producto debe ser un número")
			.isInt({min:0})
			.withMessage(`La política de stock del producto debe ser un número positivo `)
	];
};
const updateProductValidator = () => {
	// verificar los campos solo si vienen en el body

	return [
		body("productName")
			.optional()
			.escape()
			.trim()
			.isString()
			.withMessage("el nombre del producto debe conetener solo letras"),
		body("productDescription").optional().escape().trim(),
		body("productCategory")
			.optional()
			.escape()
			.trim()
			.isString()
			.withMessage("el nombre del producto debe conetener solo letras"),
		body("productStock")
			.optional()
			.escape()
			.trim()
			.isNumeric()
			.withMessage("El stock del producto debe ser un número")
			.isInt()
			.withMessage(`El stock del producto debe ser un número entero`),
		body("productPrice")
			.optional()
			.escape()
			.trim()
			.isNumeric()
			.withMessage("El precio del producto debe ser un número")
	];
};
export { productValidator, updateProductValidator };
