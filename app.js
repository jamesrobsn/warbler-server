const dotenv = require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const db = require("./models");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use(
	"/api/users/:id/messages",
	loginRequired,
	ensureCorrectUser,
	messagesRoutes
);

app.get("/api/messages", loginRequired, async function (req, res, next) {
	try {
		let messages = await db.Message.find()
			.sort({ createdAt: "desc" })
			.populate("user", {
				username: true,
				profileImageUrl: true,
			});
		return res.status(200).json(messages);
	} catch (err) {
		return next(err);
	}
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// error handler
app.use(function (req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);

module.exports = app;
