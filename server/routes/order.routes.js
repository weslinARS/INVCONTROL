import { Router } from "express";
import { createOrderValidator } from "../validators/order.validator.js";
import { deleteOrder, createOrder, getOrders, getOrder } from "../controllers/order.controller.js";
import bodyParser from "body-parser";
import { requireAuthentication } from "../middleware/requireAuthentication.middleware.js";
var jsonParser = bodyParser.json()
const router = Router();
//! MIDDLEWARE =======================================
router.use(requireAuthentication);
//! ROUTES =======================================
router.get("/order",getOrders);
router.get("/order/:id",getOrder);
router.post("/order",createOrderValidator(),createOrder);
router.put("/order/:id");
router.delete("/order/:id",deleteOrder);

export default router;
