import { body } from "express-validator";

export const postCashRegisterValidator = () => {
	return [
		body("startingAmount")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("Se requiere de un monto inicial")
			.isNumeric()
			.withMessage("El monto inicial debe ser un numero"),
	];
};

export const putCashRegisterValidator = () => {
	return [
		body("startingAmount")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("Se requiere de un monto inicial")
			.isNumeric()
			.withMessage("El monto inicial debe ser un numero"),
		body("endingAmount")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("Se requiere de un monto final")
			.isNumeric()
			.withMessage("El monto final debe ser un numero"),
		body("totalSales")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("Se requiere de un total de ventas")
			.isNumeric()
			.withMessage("El total de ventas debe ser un numero"),
		body("startTime")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("Se requiere de un tiempo de inicio"),
		body("startDate")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("Se requiere de una fecha de inicio"),
		body("endTime")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("Se requiere de un tiempo de finalizacion"),
	];
};
