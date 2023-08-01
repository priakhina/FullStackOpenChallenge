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

	const blogObjects = initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());

	// Promise.all method (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
	// can be used for transforming an array of promises into a single promise, that will be fulfilled
	// once every promise in the array passed to it as a parameter is resolved.
	await Promise.all(promiseArray);
});

test("all blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	const response = await api.get("/api/blogs");

	expect(response.body).toHaveLength(initialBlogs.length);
});

afterAll(async () => {
	await mongoose.connection.close();
});
