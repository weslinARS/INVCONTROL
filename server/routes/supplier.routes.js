import { Router } from "express";
import {
	createSupplier,
	deleteSupplier,
	getSupplier,
	getSuppliers,
	updateSupplier,
} from "../controllers/supplier.controller.js";
import { ValidatorErrorHandler } from "../middleware/ValidatorsErrorManager.middleware.js";
import { requireAdminRole } from "../middleware/requireAdminRole.middleware.js";
import { requireAuthentication } from "../middleware/requireAuthentication.middleware.js";
import {
	createSupplierValidator,
	updateSupplierValidator,
} from "../validators/supplier.validator.js";

const router = Router();
//! MIDDLEWARE =======================================
router.use(requireAuthentication);
//! ROUTES =======================================
router.post(
	"/suppliers",
	requireAdminRole,
	createSupplierValidator(),
	ValidatorErrorHandler,
	createSupplier
);
router.get("/suppliers", getSuppliers);
router.get("/suppliers/:id", requireAdminRole, getSupplier);
router.put(
	"/suppliers/:id",
	requireAdminRole,
	updateSupplierValidator(),
	ValidatorErrorHandler,
	updateSupplier
);
router.delete("/suppliers/:id", requireAdminRole, deleteSupplier);

export default router;
