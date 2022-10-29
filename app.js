const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

app.use(bodyParser.json());

mongoose.connect(
	process.env.DB_Connect,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log("DB_Connection Successfull");
	}
);

//import routes
const PostRoute = require("./routes/posts");
const UserRoute = require("./routes/user");

//middleware
app.use("/posts", PostRoute);
app.use("/user", UserRoute);

//Home get request
app.get("/", (req, res) => {
	// const newpost=new Posts({
	//     Title:"Bank Blast at Dattchaowk",
	//     newsContent:"two Robbers done unsuccesfull attempy to blast the bank"
	// });
	// newpost.save();
	res.send("Home");
	console.log("Done");
});

app.listen(3000, () => {
	console.log("running on port 3000");
});
