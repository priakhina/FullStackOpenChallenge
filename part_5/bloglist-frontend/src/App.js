import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem(
			"loggedBloglistAppUser"
		);
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem(
				"loggedBloglistAppUser",
				JSON.stringify(user)
			);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			console.error(exception.message);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedBloglistAppUser");
		setUser(null);
	};

	const loginForm = () => (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					Username:{" "}
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					Password:{" "}
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);

	return (
		<div>
			{!user && loginForm()}
			{user && (
				<div>
					<h2>Blogs</h2>
					<span>{user.name} logged in</span>{" "}
					<button onClick={handleLogout}>Logout</button>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
