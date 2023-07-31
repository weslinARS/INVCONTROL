import Products from "../models/Product.model.js";
import Sales from "../models/Sale.model.js";
import { verifyStockPolicy } from "./products.controller.js";

export const getSales = async (request, response) => {
	try {
		const sales = await Sales.find().select("-__v");
		response.status(200).json(sales);
	} catch (error) {
		response.status(404).json({ message: error.message });
	}
};
export const getSale = async (request, response) => {
	try {
		const saleFound = await Sales.findById(request.params.id);
		if (!saleFound)
			return response.status(404).json({ message: "Sale not found" });
		return response.status(200).json(saleFound);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};

export const createSale = async (request, response) => {
	try {
		const { saleDate, saleProducts } = request.body;
		const { userId } = request.headers;
		let aSaleProducts = [];
		let productsUpdated = [];
		let saleAmountCollected = 0;
		let saleTotalSales = 0;
		for (const saleProduct of saleProducts) {
			const productFound = await Products.findById(
				saleProduct.soldProductId
			);
			if (!productFound) {
				return response
					.status(404)
					.json({ message: "Producto no encontrado" });
			}
			if (productFound.productStock < saleProduct.soldProductQuantity)
				return response
					.status(404)
					.json({ message: "No hay suficiente producto" });
			productFound.productStock -= Number(
				saleProduct.soldProductQuantity
			);
			productFound.productIsOverPolicy = verifyStockPolicy(productFound);
			const productUpdatedRaw = (await productFound.save()).toObject();
			delete productUpdatedRaw.__v;
			productsUpdated.push(productUpdatedRaw);
			saleAmountCollected += Number(
				saleProduct.soldProductAmountCollected
			);
			saleTotalSales += Number(saleProduct.soldProductQuantity);
			// Agregamos cada producto de venta modificado al array aSaleProducts
			aSaleProducts.push({
				...saleProduct,
				soldProductName: productFound.productName,
			});
		}
		const newSale = new Sales({
			saleDate,
			saleAmountCollected,
			saleTotalSales,
			saleSellerId: userId,
			saleProducts: aSaleProducts,
		});
		const saleCreated = (await newSale.save()).toObject();
		delete saleCreated.__v;
		return response
			.status(201)
			.json({ sale: saleCreated, productUpdated: productsUpdated });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
export const deleteSale = async (request, response) => {
	try {
		let productsUpdated = [];
		const saleId = request.params.id;
		const saleFound = await Sales.findById(saleId);
		if (!saleFound)
			return response.status(404).json({ message: "Sale not found" });
		await Sales.findByIdAndDelete(saleId);
		const { saleProducts } = saleFound;
		for (const sale of saleProducts) {
			const productFound = await Products.findById(sale.soldProductId);
			productFound.productStock += Number(sale.soldProductQuantity);
			productFound.productIsOverPolicy = verifyStockPolicy(productFound);
			const productUpdatedRaw = (await productFound.save()).toObject();
			delete productUpdatedRaw.__v;
			productsUpdated.push(productUpdatedRaw);
		}
		console.log(productsUpdated);
		return response
		.status(200)
		.json({ productUpdated: productsUpdated });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
