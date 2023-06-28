import { Router } from "express";
import { LoginUser, SignUpUser } from "../controllers/user.controller.js";
import {
	loginValidation,
	signUpValidation,
} from "../validators/user.validator.js";
import { requireAuthentication } from "../middleware/requireAuthentication.middleware.js";
const router = Router();

// ! Login user

router.post("/login", loginValidation(), LoginUser);

//! MIDDLEWARE =======================================
router.use(requireAuthentication);
// ! Register user
router.post("/signup", signUpValidation(), SignUpUser);

export default router;
