/** @format */

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.auth =  (req, res, next) => {
	try {
        const token = req.body.token;
        console.log("hey")
        console.log(res)
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        try {
            let decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch (err) {
            res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }
            
        next();
	} catch (err) {
		console.log("Error in authorization");
		return res.status(500).json({
			success: false,
			message: "Error in login",
		});
	}
};

module.exports.isStudent = (req, res, next) => {
	try {
        if (req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This user can't access student dashboard"
            });
        }
        next();
	} catch (err) {
		console.log("Error in Student dashboard");
		return res.status(500).json({
			success: false,
			message: "Error in accessing dashboard",
		});
	}
};

module.exports.isAdmin = async (req, res, next) => {
	try {
		if (req.user.role !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This user can't access student dashboard",
			});
		}
		next();
	} catch (err) {
		console.log("Error in Student dashboard");
		return res.status(500).json({
			success: false,
			message: "Error in accessing dashboard",
		});
	}
};
