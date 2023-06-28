import {body }from "express-validator";

export const createSupplierValidator = () => {
	return [
		body("supplierName")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("el nombre del proveedor es requerido")
			.isString()
			.withMessage("el nombre del proveedor debe ser un string"),
		body("supplierPhoneNumbers")
			.notEmpty()
			.withMessage("el numero de telefono del proveedor es requerido")
			.isArray()
			.withMessage(
				"el numero de telefono del proveedor debe ser un array"
			),
		body("supplierPhoneNumbers.*")
			.trim()
			.escape()
			.notEmpty()
			.withMessage("el numero de telefono del proveedor es requerido")
			.isString()
			.withMessage(
				"el numero de telefono del proveedor debe ser un string"
			),
      body("supplierEmail")
      .notEmpty()
      .withMessage("el email del proveedor es requerido")
      .isArray()
      .withMessage("el email del proveedor debe ser un array"),
      body("supplierEmail.*")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("el email del proveedor es requerido")
      .isString()
      .withMessage("el email del proveedor debe ser un string")
      .isEmail()
      .withMessage("el email del proveedor debe ser un email valido")
      
	];
};
