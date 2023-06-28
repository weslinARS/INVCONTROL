import { body } from "express-validator";

export const createCategoryValidator = () => {
	return [
		body("name").trim().escape().exists().withMessage("Name is required"),
	];
};
