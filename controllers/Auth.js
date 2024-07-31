/** @format */

const bcrypt = require("bcrypt");
const User = require("../models/user.js");

// signup route handler
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
