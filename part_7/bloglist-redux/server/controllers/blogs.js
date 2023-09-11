const blogsRouter = require("express").Router();
const { userExtractor } = require("../utils/middleware");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
	});
	response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
	const body = request.body;
	const user = request.user;

	const blog = new Blog({
		...body,
		likes: body.likes ? body.likes : 0,
		user: user.id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
	const user = request.user;
	const blog = await Blog.findById(request.params.id);

	if (blog.user.toString() !== user.id.toString()) {
		return response.status(401).json({
			error:
				"deleting a blog is attempted by an invalid user: a blog can be deleted only by the user who added the blog",
		});
	}

	user.blogs = user.blogs.filter((b) => b.toString() !== blog.id.toString());
	await user.save();

	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
	const { likes } = request.body;

	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		{ likes },
		{ new: true, runValidators: true, context: "query" }
	);

	response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
	const { comment } = request.body;

	await Blog.findByIdAndUpdate(
		request.params.id,
		{ $push: { "comments": comment } },
		{ new: true, runValidators: true, context: "query" }
	);

	response.status(204).end();
});

module.exports = blogsRouter;
