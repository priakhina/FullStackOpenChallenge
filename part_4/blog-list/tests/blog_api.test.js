const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlogs);
});

test("all blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	const blogs = await helper.blogsInDb();

	expect(blogs).toHaveLength(helper.initialBlogs.length);
});

test("every blog has the property named id", async () => {
	const blogs = await helper.blogsInDb();

	blogs.forEach((blog) => expect(blog.id).toBeDefined());
});

test("a blog can be added", async () => {
	const newBlog = {
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

	const contents = blogsAtEnd.map((blog) => blog.title);
	expect(contents).toContain("Canonical string reduction");
});

test("when the likes property of the added blog is not specified, it defaults to the value 0", async () => {
	const newBlog = {
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();

	const addedBlog = blogsAtEnd[blogsAtEnd.length - 1];
	expect(addedBlog.likes).toBe(0);
});

afterAll(async () => {
	await mongoose.connection.close();
});
