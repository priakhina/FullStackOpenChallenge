const user = {
	name: "Superuser",
	username: "root",
	password: "secret",
};

const blog = {
	title: "React patterns",
	author: "Michael Chan",
	url: "https://reactpatterns.com/",
};

const loginUser = ({ username, password }) => {
	/* eslint-disable quotes */
	cy.get('input[name="username"]').type(username);
	cy.get('input[name="password"]').type(password);
	cy.get('button[type="submit"]').click();
	/* eslint-enable */
};

const createBlog = ({ title, author, url }) => {
	/* eslint-disable quotes */
	cy.get('input[name="blog-title"]').type(title);
	cy.get('input[name="blog-author"]').type(author);
	cy.get('input[name="blog-url"]').type(url);
	cy.get('button[type="submit"]')
		.contains(/create/i)
		.click();
	/* eslint-enable */
};

describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
		cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
		cy.visit("");
	});

	it("shows the login form", function () {
		cy.get(".login-form").contains(/log in to application/i);
	});

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			loginUser(user);
			cy.contains(`${user.name} logged in`);
		});

		it("fails with wrong credentials", function () {
			loginUser({
				username: user.username,
				password: "wrongpassword",
			});
			cy.get(".notification.failure").should(
				"contain",
				/wrong username or password/i
			);
			cy.get(".notification.failure")
				.find("span")
				.should("have.css", "background-color", "rgb(244, 67, 54)"); // rgb(244, 67, 54) or #f44336 is a dark red shade
		});
	});

	describe("When logged in", function () {
		beforeEach(function () {
			cy.login({ username: user.username, password: user.password });
		});

		it("a blog can be created", function () {
			cy.contains(/create a new blog/i).click();
			createBlog(blog);
			cy.get(".blogs-block > .blog")
				.find(".blog-title")
				.contains(blog.title);
		});

		describe("and a blog exists", function () {
			beforeEach(function () {
				cy.createBlog({ ...blog });
			});

			it("a blog can be liked", function () {
				cy.get("button").contains(/view/i).click();
				cy.get(".blog-likes").contains("0");

				cy.get("button").contains(/like/i).click();
				cy.get(".blog-likes").contains("1");
			});
		});
	});
});
