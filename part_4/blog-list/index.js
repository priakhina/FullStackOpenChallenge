const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");

const Blog = require("./models/blog");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformed id" });
	}

	next(error);
};

app.get("/api/blogs", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

app.post("/api/blogs", (request, response) => {
	const blog = new Blog(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = config.PORT;
app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`);
});
