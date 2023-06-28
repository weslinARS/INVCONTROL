import { Router } from "express";
import { createCategoryValidator } from "../validators/category.validator.js";
import { createCategory, deleteCategory, getCategories } from "../controllers/category.controller.js";
import { requireAuthentication } from "../middleware/requireAuthentication.middleware.js";
const router = Router();
//! MIDDLEWARE =======================================
router.use(requireAuthentication);
//! ROUTES =======================================
router.get("/category",getCategories);
router.get("/category/:id");
router.post("/category", createCategoryValidator(), createCategory);
router.put("/category/:id");
router.delete("/category/:id",deleteCategory);
export default router;