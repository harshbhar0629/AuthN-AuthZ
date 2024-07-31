// require express and create instance of express
const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;

// parsing data which type of data mention <3
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db connection
require("./config/database.js").connect();

// all routes
const user = require("./routes/user.js");
app.use("/api/v1", user);

// server started
app.listen(port, () => {
    console.log("Server sarted at port: 3000");
})
