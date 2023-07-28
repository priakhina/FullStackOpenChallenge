const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");
const config = require("./utils/config");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

const requestLogger = (request, response, next) => {
	logger.info("Method:", request.method);
	logger.info("Path:  ", request.path);
	logger.info("Body:  ", request.body);
	logger.info("---");
	next();
};

app.use(requestLogger);

app.use("/api/blogs", blogsRouter);

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

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = config.PORT;
app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`);
});
