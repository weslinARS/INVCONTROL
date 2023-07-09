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
