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
	try {
		const { orderDate, orderDeliveryDate, orderProducts } = request.body;
		let orderTotalOrderedProducts = orderProducts.length;
		let orderTotalPrice = 0;
		orderProducts.forEach((product) => {
			orderTotalPrice += Number(product.orderedProductPrice) * Number(product.orderedProductQuantity);
		});
		const newOrder = new Order({
			orderDate,
			orderDeliveryDate,
			orderTotalOrderedProducts,
			orderTotalPrice,
			orderProducts,
		});
		const orderSaved = await newOrder.save();
		response.status(201).json(orderSaved);
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

export const updateOrder = async (request, response) => {
	try {
		const { orderDate, orderDeliveryDate, orderProducts } = request.body;
		let orderTotalOrderedProducts = orderProducts.length;
		let orderTotalPrice = 0;
		orderProducts.forEach((product) => {
			orderTotalPrice += Number(product.orderedProductPrice) * Number(product.orderedProductQuantity);
		});
		const orderUpdated = await Order.findByIdAndUpdate(
			request.params.id,
			{
				orderDate,
				orderDeliveryDate,
				orderTotalOrderedProducts,
				orderTotalPrice,
				orderProducts,
			},
			{ new: true }
		);
		return response.status(200).json(orderUpdated);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
}
