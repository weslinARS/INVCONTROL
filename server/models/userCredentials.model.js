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
 *a function for creating  a new user with the given data and hash the password
 * @param {string} email
 * @param {string} password
 * @param {string} lastName
 * @param {string} Name
 * @param {sring} role
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
userSchema.statics.logIn = async function (userEmail, userPassword) {
	console.log("trying to log in")
	// verifying if the  userEmail exists in the databse
	const user = await this.findOne({ userEmail });
	if (!user) throw new Error("El correo no existe en la base de datos");
	console.debug("user password : " + user.userPassword)
	console.trace("comparing passwords")
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
