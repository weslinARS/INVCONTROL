import { body } from "express-validator";

export const loginValidation = () => {
	return [
		body("userEmail")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("email es requerido")
			.isEmail()
			.withMessage("email debe ser un email valido"),
		body("userPassword")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("contraseña es requerida")
			.isString()
			.withMessage("contraseña debe ser un string"),
	];
};
export const signUpValidation = () => {
	return [
		body("userName")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("nombre es requerido")
			.isString()
			.withMessage("nombre debe ser un string"),
		body("userLastName")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("apellido es requerido")
			.isString()
			.withMessage("apellido debe ser un string"),
		body("userRole")
			.trim()
			.escape()
			.notEmpty()
			.isString()
			.withMessage("role es requerido")
			.isIn(["admin", "seller"])
			.withMessage("Role debe ser admin o seller"),
		body("userPassword")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("contraseña es requerida")
			.isString()
			.withMessage("contraseña debe ser un string")
			.isStrongPassword()
			.withMessage(
				"contraseña debe tener al menos 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial"
			),
		body("userEmail")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("email es requerido")
			.isEmail()
			.withMessage("email debe ser un email valido"),
	];
};
