const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/Auth.js");
const { isStudent, auth, isAdmin } = require("../middlewares/auth.js");

router.post("/login", login);
router.post("/signup", signup);

router.get("/login", auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Student dashboard",
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
	res.status(200).json({
		success: true,
		message: "Welcome to Admin dashboard",
	});
});

module.exports = router;