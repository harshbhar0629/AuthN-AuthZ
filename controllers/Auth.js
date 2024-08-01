/** @format */

const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup controller
exports.signup = async (req, res) => {
	try {
		// get data {name, email, password, role}
		const { name, email, password, role } = req.body;

		// console.log(req.body)

		// check user already exist??
		const existingUser = await User.findOne({ email: email });

		// checking already exist or not
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exist",
			});
		}

		// console.log(password)

		// secure password
		let hashPassword;
		try {
			// 2 values first kisko hash m convert krna h or second no of round used to convert into hash
			hashPassword = await bcrypt.hash(password, 10);
		} catch (e) {
			console.log("Error in conversion of password into hash");
			return res.status(500).json({
				success: false,
				message: "Error in hashing conversion",
			});
		}

		// console.log(hashPassword)

		// user creation
		const data = await User.create({
			name,
			email,
			password: hashPassword,
			role,
		});

		return res.status(200).json({
			success: true,
			message: "User created successfully",
		});
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({
			success: false,
			message: "Error in creation of User",
		});
	}
};

// login controller
module.exports.login = async (req, res) => {
	//  I'm giving login functionality on the basis of email and password
	try {
		const { email, password } = req.body;
		let data = await User.findOne({ email: email });

		if (!data) {
			return res.status(401).json({
				success: false,
				message: "User not registered before for this email",
			});
		}

		// checking password
		// console.log(data.password);

		if (!password || !(await bcrypt.compare(password, data.password))) {
			return res.status(500).json({
				success: false,
				message: "Incorrect password",
			});
		} else {
			const payload = {
				email: data.email,
				id: data._id,
				role: data.role,
			};
			let token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "2h",
			});

			// Way-1
			data = data.toObject();
			data.token = token;
			// console.log(data.token);

			// Way-2
			// data._doc.token = token;
			// console.log(typeof data);
			// console.log(data)

			// remove password
			data.password = undefined;

			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true
			}
			console.log(data);
			res.cookie("Cookie", token, options).status(200).json({
				success: true,
				token,
				data,
				message: "Successfully loged in",
			});
		}
		
	} catch (e) {
		console.log("Error in login route");
		return res.status(500).json({
			success: false,
			message: "Error in login",
		});
	}
};


// mongoDb - parent entity
// databases - child entity
// collections - child-ka-child entity
// documents - {key-value}-pair