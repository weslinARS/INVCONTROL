import { validationResult } from "express-validator";
import User from "../models/userCredentials.model.js";
import UserInfo from "../models/userInfo.model.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
/**
 * funcion para crear un token para el usuario
 * @param {string} __id - id del usuario
 * @param {string} userRole 
 * @returns  {string} - token
 */
const createToken = (__id, userRole) => {
	return jwt.sign({ __id, userRole }, SECRET_KEY, { expiresIn: "3d" });
};
/**
 * funcion para verificar si el usuario existe en la base de datos y si la contraseña es correcta
 * @param {*} request - contiene el email y la contraseña del usuario
 * @param {*} response - contiene el token del usuario y la informacion del usuario
 * @returns status 200 - si el usuario existe y la contraseña es correcta 
 * @returns status 404 - si el usuario no existe
 * @returns status 500 - si hubo un error en el servidor
 * @returns status 400 - si hubo un error en la validacion de los datos
 */
export const LoginUser = async (request, response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(400).json({ errors: errors.array() });
	}
	try {
		const { userEmail, userPassword } = request.body;
		const user = await User.logIn(userEmail, userPassword);
		if (await user) {
			const userInformation = await UserInfo.findOne({
				userId: user._id,
			});
			const { userName, userLastName, userRole, userEmail } =
				userInformation;
			// create a token for the user
			const token = createToken(user._id, userRole);
			return response.status(200).json({
				userName,
				userLastName,
				userEmail,
				userRole,
				userToken: token,
			});
		} else return response.status(404).json({ message: "Usuario no encontrado" });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};

/**
 * funcion para crear un usuario en la base de datos en la coleccion de credenciales de usuario y en la coleccion de informacion de usuario
 * @param {*} request 
 * @param {*} response 
 * @returns  {object} - informacion del uusario creado
 * @return status 201 - si se creo correctamente
 * @return status 500 - si hubo un error en el servidor
 * @return status 400 - si hubo un error en la validacion de los datos
 */
export const SignUpUser = async (request, response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(400).json({ errors: errors.array() });
	}
	try {
		const { userName, userLastName, userRole, userPassword, userEmail } =
			request.body;
		const user = await User.signUp(userEmail, userPassword).then(
			async (user) => {
				const User = new UserInfo({
					userName,
					userLastName,
					userRole,
					userId: user._id,
					userEmail: user.userEmail,
				});
				const UserInfoSaved = await User.save();
				//create token
				const token = createToken(User.userId);
				console.trace(token);
				return response.status(201).json({
					userName,
					userLastName,
					userRole,
					userEmail,
					token,
				});
			}
		);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
/**
 * funcion para obtener la informacion de todos los usuarios
 * @param {*} request 
 * @param {*} response  - respuesta del servidor
 * @returns  - 200 si se obtuvo la informacion correctamente
 * @returns - 500 si hubo un error en el servidor
 * @returns - 404 si no se encontro informacion de los usuarios
 */
export const getAllUsers = async (request, response) => {
	try {
		const users = await UserInfo.find();
		if (!users)
			return response
				.status(404)
				.json({ message: "No se encontraron usuarios" });
		return response.status(200).json(users);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
/**
 * funcion para eliminar un usuario 
 * @param {*} request - contiene el id del usuario a eliminar
 * @param {*} response - respuesta del servidor
 * @returns - 204 si se elimino correctamente
 * @returns - 500 si hubo un error en el servidor
 * @returns - 404 si no se encontro el usuario
 */
export const deleteUser = async (request, response) => {
	if (!(await User.findById(request.params.id)))
		return response.status(404).json({
			message: "No se encontro informacion del usuario el usuario",
		});
	try {
		const response1 = await UserInfo.findOneAndDelete({
			userId: request.params.id,
		});
		const response2 = await User.findByIdAndDelete(request.params.id);
		if (!response1 || !response2)
			return response.status(404).json({
				message: "No se encontro informacion del usuario el usuario",
			});
		return response.status(204).send();
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
/**
 * funcion para actualizar la informacion de un usuario
 * @param {*} request  - contiene el id del usuario a actualizar y la informacion a actualizar
 * @param {*} response  - respuesta del servidor
 * @returns - 200 si se actualizo correctamente y 404 si no se encontro el usuario
 * @returns - 500 si hubo un error en el servidor
 * @returns - 404 si no se encontro el usuario
 */
export const updateUser = async (request, response) => {
	if (!(await User.findById(request.params.id)))
		return response.status(404).json({
			message: "No se encontro informacion del usuario el usuario",
		});
	try {
		const updatedUser = await UserInfo.findOneAndUpdate(
			{ userId: request.params.id },
			request.body,
			{ new: true }
		);
		if (!updatedUser)
			return response.status(404).json({
				message: "No se encontro informacion del usuario el usuario",
			});
		return response.status(200).json(updatedUser);
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};
