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
			cy.login(user);
		});

		it("a blog can be created", function () {
			cy.contains(/create a new blog/i).click();
			createBlog(blog);
			cy.get(".blogs-block > .blog").find(".blog-title").contains(blog.title);
		});

		describe("and a blog exists", function () {
			beforeEach(function () {
				cy.createBlog(blog);
			});

			it("a blog can be liked", function () {
				cy.get("button").contains(/view/i).click();
				cy.get(".blog-likes").contains("0");

				cy.get("button").contains(/like/i).click();
				cy.get(".blog-likes").contains("1");
			});

			it("a blog can be deleted by the user who created it", function () {
				cy.get("button").contains(/view/i).click();
				cy.get("button")
					.contains(/delete/i)
					.click();
				cy.get(".notification.success").should(
					"contain",
					`Deleted "${blog.title}" by ${blog.author}`
				);
				cy.get(".blogs-block").contains(blog.title).should("not.exist");
			});

			it("only the creator can see the delete button of a blog", function () {
				cy.get("button").contains(/view/i).click();
				cy.get("button").contains(/delete/i);
				cy.get("button")
					.contains(/logout/i)
					.click();

				const anotherUser = {
					name: "Anotheruser",
					username: "imposter",
					password: "somesecretpassword",
				};
				cy.request("POST", `${Cypress.env("BACKEND")}/users`, anotherUser);
				cy.login(anotherUser);

				cy.get("button").contains(/view/i).click();
				cy.get("button")
					.contains(/delete/i)
					.should("not.exist");
			});
		});

		describe("and multiple blogs exist with different number of likes", function () {
			const unorderedLikes = [5, 10, 3, 7, 25];

			beforeEach(function () {
				const blogs = unorderedLikes.map((likes) => ({
					...blog,
					likes,
				}));

				blogs.forEach((blog) => cy.createBlog(blog));
			});

			it("blogs are ordered according to likes with the blog with the most likes being first", function () {
				const orderedLikes = unorderedLikes.sort((a, b) => b - a);

				cy.get(".blogs-block > .blog").each(($el, index) => {
					cy.wrap($el).find("button").contains(/view/i).click();
					cy.wrap($el)
						.find(".blog-likes")
						.should("contain", orderedLikes[index]);
				});
			});
		});
	});
});
