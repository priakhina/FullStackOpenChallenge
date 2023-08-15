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

describe("<Blog />", () => {
	let container;

	beforeEach(() => {
		container = render(<Blog blog={blog} loggedUser={user} />).container;
	});

	test("renders the blog's title and author but not its URL or number of likes by default", () => {
		const blogTitle = container.querySelector(".blog-title");
		expect(blogTitle).toHaveTextContent("React patterns");

		const blogAuthor = container.querySelector(".blog-author");
		expect(blogAuthor).toHaveTextContent("Michael Chan");

		const blogUrl = screen.queryByText("https://reactpatterns.com/");
		expect(blogUrl).toBeNull();

		const blogLikes = screen.queryByText("0");
		expect(blogLikes).toBeNull();
	});

	test("renders the blog's URL and number of likes when the view button is clicked", async () => {
		const user = userEvent.setup();
		const viewButton = screen.getByRole("button", { name: /view/i });
		await user.click(viewButton);

		const blogUrl = container.querySelector(".blog-url");
		expect(blogUrl).toHaveTextContent("https://reactpatterns.com/");

		const blogLikes = container.querySelector(".blog-likes");
		expect(blogLikes).toHaveTextContent("0");
	});
});
