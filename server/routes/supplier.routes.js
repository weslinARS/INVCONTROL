import { Router } from "express";
import { createSupplierValidator } from "../validators/supplier.validator.js";
import { createSupplier, deleteSupplier, getSupplier, getSuppliers } from "../controllers/supplier.controller.js";
import { requireAuthentication } from "../middleware/requireAuthentication.middleware.js";
const router = Router();
//! MIDDLEWARE =======================================
router.use(requireAuthentication);
//! ROUTES =======================================
router.post("/suppliers", createSupplierValidator(), createSupplier);
router.get("/suppliers",getSuppliers);
router.get("/suppliers/:id",getSupplier);
router.put("/suppliers/:id");
router.delete("/suppliers/:id",deleteSupplier);

export default router;
