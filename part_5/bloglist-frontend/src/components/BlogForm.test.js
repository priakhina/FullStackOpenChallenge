import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

const user = {
	id: "64d557c6cdd9372a3ff8115f",
	username: "root",
	name: "Superuser",
};

const blog = {
	id: "64d5580bcdd9372a3ff8116a",
	title: "React patterns",
	author: "Michael Chan",
	url: "https://reactpatterns.com/",
	likes: 0,
	user,
};

const mockCreateHandler = jest.fn();

describe("<BlogForm />", () => {
	let container;

	beforeEach(() => {
		container = render(
			<BlogForm createBlog={mockCreateHandler} />
		).container;
	});

	test("calls the event handler with the right details when a new blog is created", async () => {
		const user = userEvent.setup();

		/* eslint-disable quotes */
		const blogTitleInput = container.querySelector(
			'input[name="blog-title"]'
		);
		const blogAuthorInput = container.querySelector(
			'input[name="blog-author"]'
		);
		const blogUrlInput = container.querySelector('input[name="blog-url"]');
		/* eslint-enable */

		const createButton = screen.getByRole("button", {
			name: /create/i,
		});

		await user.type(blogTitleInput, blog.title);
		await user.type(blogAuthorInput, blog.author);
		await user.type(blogUrlInput, blog.url);

		await user.click(createButton);

		expect(mockCreateHandler.mock.calls).toHaveLength(1);
		expect(mockCreateHandler.mock.calls[0][0].title).toBe(blog.title);
		expect(mockCreateHandler.mock.calls[0][0].author).toBe(blog.author);
		expect(mockCreateHandler.mock.calls[0][0].url).toBe(blog.url);
	});
});
