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
	];
};
const updateProductValidator = () => {
	return [
		body("productName")
			.escape()
			.trim()
			.isString()
			.withMessage("el nombre del producto debe conetener solo letras"),
		body("productDescription").escape().trim(),
		body("productCategory")
			.escape()
			.trim()
			.isString()
			.withMessage("el nombre del producto debe conetener solo letras"),
		body("productStock")
			.escape()
			.trim()
			.isNumeric()
			.withMessage("El stock del producto debe ser un número")
			.isInt()
			.withMessage(`El stock del producto debe ser un número entero`),
		body("productPrice")
			.escape()
			.trim()
			.isNumeric()
			.withMessage("El precio del producto debe ser un número")
			.isInt()
			.withMessage(`El precio del producto debe ser un número entero`),
	];
};
export { productValidator, updateProductValidator };
