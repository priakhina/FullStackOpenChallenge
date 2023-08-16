import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

const blog = {
	title: "React patterns",
	author: "Michael Chan",
	url: "https://reactpatterns.com/",
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

		const mockCallArgs = mockCreateHandler.mock.calls[0][0];
		Object.keys(blog).forEach((key) =>
			expect(mockCallArgs[key]).toBe(blog[key])
		);
	});
});
