import { body } from "express-validator";

export const createSalesValidator = () => {
	return [
		body("saleDate")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("La fecha de la venta es requerida")
			.isString()
			.withMessage(
				"La fecha de la venta debe ser una cadena de caracteres"
			),
		body("SaleProducts")
			.notEmpty()
			.withMessage("Los productos de la venta son requeridos")
			.isArray()
			.withMessage("Los productos de la venta deben ser un arreglo"),
		body("SaleProducts.*.soldProductName")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("El nombre del producto es requerido")
			.isString()
			.withMessage(
				"El nombre del producto debe ser una cadena de caracteres"
			),
		body("SaleProducts.*.soldProductQuantity")
			.trim()
			.escape()
			.isNumeric()
			.withMessage("La cantidad del producto debe ser un número")
			.isInt({
				min: 1,
				withMessage: "La cantidad del producto debe ser mayor a 0",
			})
			.withMessage("La cantidad del producto debe ser un número entero"),
		body("SaleProducts.*.soldProductAmountCollected")
			.trim()
			.escape()
			.isNumeric()
			.withMessage(
				"El monto recolectado del producto debe ser un número"
			),
			body("SaleProducts.*.soldProductId")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("El id del producto vendido es requerido")
			.isString()
			.withMessage("El id del producto vendido debe de se un string")
			
	];
};
