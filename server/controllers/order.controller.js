import { validationResult } from "express-validator";
import Order from "../models/Order.model.js";

export const getOrders = async (request, response) => {
	try {
		const orders = await Order.find();
		response.status(200).json(orders);
	} catch (error) {
		response.status(404).json({ message: error.message });
	}
};

export const createOrder = async (request, response) => {
	let error = validationResult(request);
	if (!error.isEmpty()) {
		return response.status(400).json({ error: error.array() });
	}
	try {
		const { orderDate, orderDeliveryDate, orderProducts } = request.body;
		const newOrder = new Order({
			orderDate,
			orderDeliveryDate,
			orderProducts,
		});
		const orderSaved = await newOrder.save();
		response.status(200).json(orderSaved);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};

export const deleteOrder = async (request, response) => {
	try {
		const orderDeleted = await Order.findByIdAndDelete(request.params.id);
		return response.status(200).json(orderDeleted);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};

export const getOrder = async (request, response) => {
	try {
		const orderFound = await Order.findById(request.params.id);
		if (!orderFound)
			return response.status(404).json({ message: "Order not found" });
		return response.status(200).json(orderFound);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
