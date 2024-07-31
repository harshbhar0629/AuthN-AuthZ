/** @format */

const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
	mongoose
		.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Db connection successfully");
		})
		.catch((e) => {
            console.log("Error in db connection");
            process.exit(1);
		});
};
