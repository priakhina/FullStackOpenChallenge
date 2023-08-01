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

describe("when there is initially some blogs saved", () => {
	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("all blogs are returned", async () => {
		const blogs = await helper.blogsInDb();

		expect(blogs).toHaveLength(helper.initialBlogs.length);
	});

	test("every blog has the property named id", async () => {
		const blogs = await helper.blogsInDb();

		blogs.forEach((blog) => expect(blog.id).toBeDefined());
	});
});

describe("addition of a new blog", () => {
	test("succeeds with status code 201 if data is valid", async () => {
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

	test("sets the default value of the likes property to 0 if the likes property of the added blog is not specified", async () => {
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

	test("fails with status code 400 if the title property of the added blog is not specified", async () => {
		const newBlog = {
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
			likes: 0,
		};

		await api.post("/api/blogs").send(newBlog).expect(400);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	});

	test("fails with status code 400 if the url property of the added blog is not specified", async () => {
		const newBlog = {
			title: "TDD harms architecture",
			author: "Robert C. Martin",
			likes: 0,
		};

		await api.post("/api/blogs").send(newBlog).expect(400);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	});
});

describe("deletion of a blog", () => {
	test("succeeds with status code 204 if id is valid", async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

		const contents = blogsAtEnd.map((blog) => blog.title);
		expect(contents).not.toContain(blogToDelete.title);
	});
});

describe("updating a blog", () => {
	test("succeeds with status code 200 if id is valid", async () => {
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
});

afterAll(async () => {
	await mongoose.connection.close();
});
