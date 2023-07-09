import { Router } from "express";
import { createSupplierValidator,updateSupplierValidator } from "../validators/supplier.validator.js";
import { createSupplier, deleteSupplier, getSupplier, getSuppliers, updateSupplier } from "../controllers/supplier.controller.js";
import { requireAuthentication } from "../middleware/requireAuthentication.middleware.js";
import { requireAdminRole } from "../middleware/requireAdminRole.middleware.js";
const router = Router();
//! MIDDLEWARE =======================================
router.use(requireAuthentication);
//! ROUTES =======================================
router.post("/suppliers",requireAdminRole, createSupplierValidator(), createSupplier);
router.get("/suppliers",requireAdminRole,getSuppliers);
router.get("/suppliers/:id",requireAdminRole,getSupplier);
router.put("/suppliers/:id",requireAdminRole,updateSupplierValidator(),updateSupplier);
router.delete("/suppliers/:id",requireAdminRole,deleteSupplier);

export default router;
