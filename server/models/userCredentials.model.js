import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
const userSchema = new Schema({
	userPassword: {
		type: String,
		required: true,
	},
	userEmail: {
		type: String,
		required: true,
		unique: true,
	},
});

/**
 * funcion para crear un usuario en la base de datos en la coleccion de credenciales de usuario
 * @param {string} email
 * @param {string} password
 * @returns {object} user
 */
userSchema.statics.signUp = async function (userEmail, userPassword) {
	// check if email exists
	const existEmail = await this.findOne({ userEmail });
	if (existEmail) {
		throw new Error("Email already exists");
	}
	// hashing password
	const salt = await bcrypt.genSalt(10); // 10 is the number of rounds
	const hashPassword = await bcrypt.hash(userPassword, salt); // hash the password
	const user = await this.create({
		userPassword: hashPassword,
		userEmail,
	});
	return user;
};
/**
 * funcion para verificar si el usuario existe en la base de datos y si la contraseña es correcta
 * @param {string} userEmail
 * @param {string} userPassword
 * @returns
 */
userSchema.statics.logIn = async function (userEmail, userPassword) {
	// verifying if the  userEmail exists in the databse
	const user = await this.findOne({ userEmail });
	if (!user) throw new Error("El correo no existe en la base de datos");
	// comparing the password if the user exists isValidPassword will contain a true value if not it will contain a false value
	const isValidPassword = await bcrypt.compare(
		userPassword,
		user.userPassword
	);
	if (!isValidPassword) throw new Error("Contraseña incorrecta");
	return user;
};
/**
 * funcion para actualizar la contraseña de un usuario
 * @param {string} userId id del usuario a actualizar
 * @param {string} userEmail correo del usuario a actualizar
 * @param {*} userPassword
 * @returns
 */
userSchema.statics.UpdateUser = async function (
	userId,
	userEmail,
	userPassword
) {
	console.trace("userId", userId);
	const user = await await this.findById({ _id: userId });
	if (!user) throw new Error("El correo no existe en la base de datos");
	// hashing password
	console.trace("userPassword", userPassword);
	try {
		const salt = await bcrypt.genSalt(10); // 10 is the number of rounds
		const hashPassword = await bcrypt.hash(userPassword, salt); // hash the password
		const userUpdate = await this.updateOne({_id : userId},{
			userPassword: hashPassword,
			userEmail,
		});
	} catch (error) {
		throw new Error("Error al actualizar el usuario");
	}

	return userEmail;
};
export default model("UserCredentials", userSchema);
