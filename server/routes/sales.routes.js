import {Router} from "express"
import {createSalesValidator} from "../validators/sales.validator.js"
import { createSale, deleteSale, getSale, getSales } from "../controllers/sales.controller.js";
import { requireAuthentication } from "../middleware/requireAuthentication.middleware.js";

const router = Router();
//! MIDDLEWARE =======================================
router.use(requireAuthentication);
//! routes =======================

router.get("/sales", getSales); 
router.get("/sales/:id",getSale );
router.post("/sales", createSalesValidator(),createSale );
router.put("/sales/:id", );
router.delete("/sales/:id",deleteSale );



export default router;