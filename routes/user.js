const bodyParser = require("body-parser");
const express = require("express");
const User = require("../models/users");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");

require("dotenv/config");

const path = require("path");

//create and assign a token

const app = express();

app.use(bodyParser.json());
const router = express.Router();

//get all users

router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.send(err);
	}
});

//New registreation ;
router.post("/register", async (req, res) => {
	console.log("registreation..........");
	console.log(req.body);
	const idExist = await User.findOne({ User_Id: req.body.id });
	if (idExist) return res.status(400).send("is already exist");

	const newuser = new User({
		User_Id: req.body.id,
		Password: md5(req.body.pass),
	});

	try {
		const newRegister = await newuser.save();
		res.json(newRegister);
	} catch (err) {
		res.send(err);
	}
});

router.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "../login.html"));
});
//login
router.post("/login", async (req, res) => {
	const form = formidable();
	form.parse(req, async (err, fields, files) => {
		if (err) {
			return res.status(500).send("Internal server error");
		}
		console.log(fields);
		const idExist = await User.findOne({
			User_Id: fields.id,
			Password: md5(fields.pass),
		});
		console.log("here2");
		if (!idExist)
			return res.status(400).send("Check password or UserId correctly");

		const token = jwt.sign({ _id: User._id }, process.env.TOKEN_SECRET);
		res.header("auth-token", token).send(token);
	});

	//res.send("loged in");
});

module.exports = router;
