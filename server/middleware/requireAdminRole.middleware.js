export const requireAdminRole = async (request, response, next) => {
	const { userRole } = request.headers;
	if (!userRole)
		return response.status(400).json({
			message: "rol de usuario no encontrado",
		});
	if (userRole !== "admin")
		return response.status(401).json({
			message:
				"no tiene el rol de administrador para acceder a este recurso",
		});
	next();
};
