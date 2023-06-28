import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
import User from "../models/userCredentials.model.js";
export const requireAuthentication = async (request, response, next) => {
	const { authorization } = request.headers;
	if (!authorization)
		return response.status(401).json({
			message: "se requiere de un token para acceder a este recurso",
		});
	// getting the token from the header without the bearer
	const token = authorization.split(" ")[1];
	try {
		const { __id } = jwt.verify(token, SECRET_KEY);
		await User.findById(__id).select("_id");
		next();
	} catch (error) {
		response.status(401).json({ message: "token invalido" });
	}
};
