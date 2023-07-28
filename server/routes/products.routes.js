import { Router } from "express";
import {
	createProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} from "../controllers/products.controller.js";
import {
	productValidator,
	updateProductValidator,
} from "../validators/product.validator.js";
import { requireAuthentication } from "../middleware/requireAuthentication.middleware.js";
import { body } from "express-validator";
import { ValidatorErrorHandler } from "../middleware/ValidatorsErrorManager.middleware.js";
const router = Router();
//! ROUTES =======================================
router.get("/products", requireAuthentication, getProducts);
router.get("/products/:id", requireAuthentication, getProduct);
router.post(
	"/products",
	requireAuthentication,
	productValidator(),
	ValidatorErrorHandler,
	createProduct
);
router.put(
	"/products/:id",
	requireAuthentication,
	updateProductValidator(),
	ValidatorErrorHandler,
	updateProduct
);
router.delete("/products/:id", requireAuthentication, deleteProduct);

export default router;
