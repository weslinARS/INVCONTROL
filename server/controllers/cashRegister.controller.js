import CashRegisterModel from "../models/CashRegister.model.js";
import { validationResult } from "express-validator";
/**
 * controlador para obtener el registro de la caja actual del dia
 * @param {*} request
 * @param {*} response
 * @returns {json} retorna el registro de la caja actual del dia con un estado 200 si fue encontrado en caso de un error retorna un estado 404 con un mensaje de error
 */
export const getCashRegister = async (request, response) => {
	const { startTime } = request.body;
	const cashRegisterFound = await CashRegisterModel.findOne({
		startTime: startTime,
	});
	if (!cashRegisterFound)
		return response
			.status(404)
			.json({ message: "Cash Register not found" });
	return response.status(200).json(cashRegisterFound);
};

/**
 * controlador  para crear un registro de caja del dia en caso de que este no exista actualmente
 * @param {*} request
 * @param {*} response
 * @returns retorna el registro de la caja atual del dia con un estado 201 si fue creado correctamente en caso de un error retorna un estado 500 con un mensaje de error
 */
export const postCashRegister = async (request, response) => {
	const error = validationResult(request);
	if (!error.isEmpty()) {
		return response.status(400).json({ error: error.array() });
	}
	try {
		const { startingAmount } = request.body;
		const cashRegisterCreated = await CashRegisterModel.create({
			startingAmount: startingAmount,
			startTime: new Date(),
		});
		const cashRegisterSaved = await cashRegisterCreated.save();
		return response.status(201).json(cashRegisterSaved);
	} catch (error) {
		console.error(error.message);
		return response.status(500).json({ message: error.message });
	}
};

export const DeleteCashRegister = async (request, response) => {
	const { id } = request.params;
	if (!id || id == null || id == undefined || id == "")
		return response
			.status(404)
			.json({ message: "no se encontro el id del registro a eliminar" });
	return response.json();
};
