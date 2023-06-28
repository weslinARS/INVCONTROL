import { validationResult } from "express-validator";
import User from "../models/userCredentials.model.js";
import UserInfo from "../models/userInfo.model.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
const createToke = (__id) => {
	return jwt.sign({ __id }, SECRET_KEY, { expiresIn: "3d" });
};
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
			const token = createToke(user._id);
			return response.status(200).json({
				userName,
				userLastName,
				userEmail,
				userRole,
				userToken: token,
			});
		} else return response.status(404).json({ message: "User not found" });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
};

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
				console.log("Creando usuario con su info");
				const User = new UserInfo({
					userName,
					userLastName,
					userRole,
					userId: user._id,
					userEmail: user.userEmail,
				});
				const UserInfoSaved = await User.save();
				//create token
				const token = createToke(User.userId);
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
