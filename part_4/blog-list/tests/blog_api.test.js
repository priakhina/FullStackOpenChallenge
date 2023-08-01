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

test("when the title or url properties of the added blog are not specified, the response status code is 400", async () => {
	let newBlog = {
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
	};

	await api.post("/api/blogs").send(newBlog).expect(400);

	let blogsAtEnd = await helper.blogsInDb();

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

	newBlog = {
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		likes: 0,
	};

	await api.post("/api/blogs").send(newBlog).expect(400);

	blogsAtEnd = await helper.blogsInDb();

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test("a blog can be deleted", async () => {
	const blogsAtStart = await helper.blogsInDb();
	const blogToDelete = blogsAtStart[0];

	await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

	const contents = blogsAtEnd.map((blog) => blog.title);
	expect(contents).not.toContain(blogToDelete.title);
});

test("the likes property of an existing blog can be updated", async () => {
	const blogsAtStart = await helper.blogsInDb();
	const blogToUpdate = blogsAtStart[0];

	expect(blogToUpdate.likes).toBe(7);

	await api
		.put(`/api/blogs/${blogToUpdate.id}`)
		.send({ ...blogToUpdate, likes: 15 })
		.expect(200)
		.expect("Content-Type", /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	const updatedBlog = blogsAtEnd[0];

	expect(updatedBlog.likes).toBe(15);
});

afterAll(async () => {
	await mongoose.connection.close();
});
