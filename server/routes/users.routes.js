import { Router } from "express";
import {
	LoginUser,
	SignUpUser,
	getAllUsers,
	deleteUser,
	updateUser
} from "../controllers/user.controller.js";
import {
	loginValidation,
	UserDataValidation,
} from "../validators/user.validator.js";
import { requireAuthentication } from "../middleware/requireAuthentication.middleware.js";
import { requireAdminRole } from "../middleware/requireAdminRole.middleware.js";
const router = Router();

// ! Login user
router.post("/login", loginValidation(), LoginUser);
//! MIDDLEWARE =======================================
router.use(requireAuthentication);
// ! get all users
router.get("/users",requireAdminRole, getAllUsers);
// ! Register user
router.post("/signup",requireAdminRole, UserDataValidation(), SignUpUser);
router.delete("/user/:id",requireAdminRole, deleteUser);
router.put("/user/:id",requireAdminRole, updateUser);
export default router;
