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
const router = Router();
//! MIDDLEWARE =======================================
router.use(requireAuthentication);
//! ROUTES =======================================
router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", productValidator(), createProduct);
router.put("/products/:id", updateProductValidator(), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
