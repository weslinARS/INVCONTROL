import CashRegisterModel from "../models/CashRegister.model.js";
import Sale from "../models/Sale.model.js";
/**
 * controlador para obtener el registro de la caja actual del dia
 * @param {*} request
 * @param {*} response
 * @returns {json} retorna el registro de la caja actual del dia con un estado 200 si fue encontrado en caso de un error retorna un estado 404 con un mensaje de error
 */
export const getCashRegister = async (request, response) => {
	const today = new Date();
	const date =
		today.getDate() +
		"/" +
		(today.getMonth() + 1) +
		"/" +
		today.getFullYear();
	const cashRegisterFound = await CashRegisterModel.findOne({
		startDate: date,
	});
	if (!cashRegisterFound)
		return response.status(404).json({
			message:
				"No se ha ingresado el Monto de inicio, dirijase a la página de inicio para ingresar el monto de apertura de caja",
		});
	return response.status(200).json(cashRegisterFound);
};

/**
 * controlador  para crear un registro de caja del dia en caso de que este no exista actualmente
 * @param {*} request
 * @param {*} response
 * @returns retorna el registro de la caja atual del dia con un estado 201 si fue creado correctamente en caso de un error retorna un estado 500 con un mensaje de error
 */
export const postCashRegister = async (request, response) => {
	try {
		const { startingAmount } = request.body;
		console.debug(startingAmount);
		const today = new Date();
		const date =
			today.getDate() +
			"/" +
			(today.getMonth() + 1) +
			"/" +
			today.getFullYear();
		const time =
			today.getHours() +
			":" +
			today.getMinutes() +
			":" +
			today.getSeconds();
		const cashRegisterCreated = await CashRegisterModel.create({
			startingAmount: startingAmount,
			startTime: time,
			startDate: date,
		});
		const cashRegisterSaved = await cashRegisterCreated.save();
		return response.status(201).json(cashRegisterSaved);
	} catch (error) {
		console.error(error.message);
		return response.status(500).json({ message: error.message });
	}
};

export const putCashRegister = async (request, response) => {
	const { id } = request.params;
	console.debug("jbjdbjdbjdbjdb")
	console.debug(id);
	if (!id || id == null || id == undefined || id == "")
		return response.status(404).json({
			message: "no se encontro el id del registro a actualizar",
		});
	const requestBody = request.body;
	if (
		!requestBody ||
		requestBody == null ||
		requestBody == undefined ||
		requestBody == ""
	)
		return response
			.status(404)
			.json({ message: "no se encontro el cuerpo de la peticion" });
	const cashRegisterFound = await CashRegisterModel.findById(id);
	if (!cashRegisterFound)
		return response
			.status(404)
			.json({ message: "no se encontro el registro a actualizar" });
	// buscando las ventas del dia
	const today = new Date();
	const salesFound = await Sale.find({
		saleDate: {
			$eq: today.toISOString().slice(0, 10),
		},
	});
	let totalSales = 0;
	let totalAmountCollected = 0;
	for (const saleFound of salesFound) {
		totalAmountCollected += saleFound.saleAmountCollected;
		totalSales += saleFound.saleTotalSales;
	}
	const cashRegisterUpdated = await CashRegisterModel.findByIdAndUpdate(
		id,
		{
			startTime: cashRegisterFound.startTime,
			startDate: cashRegisterFound.startDate,
			startingAmount: cashRegisterFound.startingAmount,
			totalSales: totalSales,
			endingAmount: totalAmountCollected,
			endTime: today.getHours() + ":" + today.getMinutes(),
		},
		{ new: true }
	);
	if (!cashRegisterUpdated)
		return response
			.status(404)
			.json({ message: "no se pudo actualizar el registro" });
	return response.status(201).json(cashRegisterUpdated);
};

export const DeleteCashRegister = async (request, response) => {
	const { id } = request.params;
	if (!id || id == null || id == undefined || id == "")
		return response
			.status(404)
			.json({ message: "no se encontro el id del registro a eliminar" });
	return response.json();
};
