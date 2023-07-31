import { Router } from "express";
import {
	DeleteCashRegister,
	getCashRegister,
	postCashRegister,
	putCashRegister,
} from "../controllers/cashRegister.controller.js";
import { requireAuthentication } from "../middleware/requireAuthentication.middleware.js";
import {ValidatorErrorHandler} from '../middleware/ValidatorsErrorManager.middleware.js'
import {
	postCashRegisterValidator,
	putCashRegisterValidator,
} from "../validators/index.js";
const router = Router();

router.get("/cashRegister", requireAuthentication, getCashRegister);

router.post(
	"/cashRegister",
	requireAuthentication,
	postCashRegisterValidator(),
	postCashRegister
);

router.put(
	"/cashRegister/:id",
	requireAuthentication,
	putCashRegister
);

router.delete(
	"/cashRegister/:id",
	DeleteCashRegister
);

export default router;
