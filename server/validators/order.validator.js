import { body } from "express-validator";

export const createOrderValidator = () => {
	return [
		body("orderDate")
			.escape()
			.trim()
			.notEmpty()
			.withMessage("fecha de orden es requerida"),
		body("orderDeliveryDate")
			.escape()
			.trim()
			.notEmpty()
			.withMessage("fecha de entrega es requerida"),
		body("orderProducts")
			.notEmpty()
			.withMessage("productos de orden es requerida")
			.isArray()
			.withMessage("debe ser un arreglo"),
		body("orderProducts.*.orderedProductName")
			.escape()
			.trim()
			.notEmpty()
			.withMessage("nombre de producto es requerido")
			.isString()
			.withMessage("debe ser un string"),
		body("orderProducts.*.orderedProductQuantity")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("cantidad de producto es requerido")
			.isNumeric()
			.withMessage("debe ser un numero")
			.isInt()
			.withMessage("debe ser un numero entero"),
		body("orderProducts.*.orderedProductPrice")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("precio de producto es requerido")
			.isNumeric()
			.withMessage("debe ser un numero"),
	];
};
