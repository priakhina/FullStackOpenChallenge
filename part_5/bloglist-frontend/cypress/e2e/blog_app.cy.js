describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		const user = {
			name: "Superuser",
			username: "root",
			password: "secret",
		};
		cy.request("POST", "http://localhost:3003/api/users/", user);
		cy.visit("http://localhost:3000");
	});

	it("shows the login form", function () {
		cy.get(".login-form").contains(/log in to application/i);
	});

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			/* eslint-disable quotes */
			cy.get('input[name="username"]').type("root");
			cy.get('input[name="password"]').type("secret");
			cy.get('button[type="submit"]').click();
			/* eslint-enable */
			cy.contains("Superuser logged in");
		});

		it("fails with wrong credentials", function () {
			/* eslint-disable quotes */
			cy.get('input[name="username"]').type("root");
			cy.get('input[name="password"]').type("wrongpassword");
			cy.get('button[type="submit"]').click();
			/* eslint-enable */
			cy.get(".notification.failure").should(
				"contain",
				/wrong username or password/i
			);
			cy.get(".notification.failure")
				.find("span")
				.should("have.css", "background-color", "rgb(244, 67, 54)"); // rgb(244, 67, 54) or #f44336 is a dark red shade
		});
	});
});
