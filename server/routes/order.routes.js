import { Router } from "express";
import { createOrderValidator } from "../validators/order.validator.js";
import { deleteOrder, createOrder, getOrders, getOrder, updateOrder } from "../controllers/order.controller.js";
import bodyParser from "body-parser";
import { requireAuthentication } from "../middleware/requireAuthentication.middleware.js";
import { requireAdminRole } from "../middleware/requireAdminRole.middleware.js";
import {ValidatorErrorHandler} from '../middleware/ValidatorsErrorManager.middleware.js'
var jsonParser = bodyParser.json()
const router = Router();
//! MIDDLEWARE =======================================
router.use(requireAuthentication);
//! ROUTES =======================================
router.get("/order",getOrders);
router.get("/order/:id",requireAdminRole,getOrder);
router.post("/order",requireAdminRole,createOrderValidator(),ValidatorErrorHandler,createOrder);
router.put("/order/:id",requireAdminRole,createOrderValidator(),ValidatorErrorHandler,updateOrder);
router.delete("/order/:id",requireAdminRole,deleteOrder);

export default router;
