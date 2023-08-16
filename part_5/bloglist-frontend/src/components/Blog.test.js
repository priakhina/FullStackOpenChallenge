import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

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

const mockUpdateHandler = jest.fn();

describe("<Blog />", () => {
	let container;

	beforeEach(() => {
		container = render(
			<Blog
				blog={blog}
				loggedUser={user}
				updateBlog={mockUpdateHandler}
			/>
		).container;
	});

	test("renders the blog's title and author but not its URL or number of likes by default", () => {
		const blogTitle = container.querySelector(".blog-title");
		expect(blogTitle).toHaveTextContent(blog.title);

		const blogAuthor = container.querySelector(".blog-author");
		expect(blogAuthor).toHaveTextContent(blog.author);

		const blogUrl = screen.queryByText(blog.url);
		expect(blogUrl).toBeNull();

		const blogLikes = screen.queryByText(blog.likes);
		expect(blogLikes).toBeNull();
	});

	test("renders the blog's URL and number of likes when the view button is clicked", async () => {
		const user = userEvent.setup();
		const viewButton = screen.getByRole("button", { name: /view/i });
		await user.click(viewButton);

		const blogUrl = container.querySelector(".blog-url");
		expect(blogUrl).toHaveTextContent(blog.url);

		const blogLikes = container.querySelector(".blog-likes");
		expect(blogLikes).toHaveTextContent(blog.likes);
	});

	test("calls the event handler twice when the like button is clicked twice", async () => {
		const user = userEvent.setup();
		const viewButton = screen.getByRole("button", { name: /view/i });
		await user.click(viewButton);

		const likeButton = screen.getByRole("button", { name: /like/i });

		const clickCounter = 2;
		for (let i = 0; i < clickCounter; ++i) {
			await user.click(likeButton);
		}

		expect(mockUpdateHandler.mock.calls).toHaveLength(clickCounter);
	});
});
