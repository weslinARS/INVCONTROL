import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
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
 * @param {*} userEmail 
 * @param {*} userPassword 
 * @returns 
 */
userSchema.statics.logIn = async function (userEmail, userPassword) {
	console.log("trying to log in")
	// verifying if the  userEmail exists in the databse
	const user = await this.findOne({ userEmail });
	if (!user) throw new Error("El correo no existe en la base de datos");
	// comparing the password if the user exists isValidPassword will contain a true value if not it will contain a false value
	const isValidPassword = await bcrypt.compare(
		userPassword,
		user.userPassword
	);
	console.debug(isValidPassword)
	if (!isValidPassword) throw new Error("Contraseña incorrecta");
	return user; 
};
export default model("UserCredentials", userSchema);
