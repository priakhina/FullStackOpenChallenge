const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
	{
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
	},
	{
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(initialBlogs);
});

test("all blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	const response = await api.get("/api/blogs");

	expect(response.body).toHaveLength(initialBlogs.length);
});

test("every blog has the property named id", async () => {
	const response = await api.get("/api/blogs");

	response.body.forEach((blog) => expect(blog.id).toBeDefined());
});

afterAll(async () => {
	await mongoose.connection.close();
});
