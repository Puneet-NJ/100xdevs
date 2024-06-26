const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index.js");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

// Admin Routes
router.post("/signup", async (req, res) => {
	// Implement admin signup logic

	const username = req.body.username;
	const password = req.body.password;

	const admin = new Admin({
		username: username,
		password: password,
	});
	await admin.save();

	res.json({ message: "Admin created successfully" });
});

router.post("/signin", async (req, res) => {
	// Implement admin signup logic
	const username = req.body.username;
	const password = req.body.password;

	const admin = await Admin.find({ username, password });
	if (admin) {
		const token = jwt.sign({ username: username }, JWT_SECRET);
		return res.json({ token: token });
	} else {
		res.status(411).json({ msg: "Not correct email or password" });
	}
});

router.post("/courses", adminMiddleware, async (req, res) => {
	// Implement course creation logic
	const title = req.body.title;
	const description = req.body.description;
	const price = req.body.price;
	const imageLink = req.body.imageLink;

	const course = await Course.create({
		title,
		description,
		price,
		imageLink,
	});

	res.json({
		message: "Course created successfully",
		courseId: course._id,
	});
});

router.get("/courses", adminMiddleware, async (req, res) => {
	// Implement fetching all courses logic

	const courses = await Course.find({});

	res.json({
		courses,
	});
});

module.exports = router;
