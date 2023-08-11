import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [notificationMessage, setNotificationMessage] = useState(null);

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
			blogService.setToken(user.token);
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

			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			setNotificationMessage({
				type: "failure",
				message: "Wrong username or password",
			});
			setTimeout(() => {
				setNotificationMessage(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedBloglistAppUser");
		setUser(null);
	};

	const addBlog = async (newBlog) => {
		await blogService.create(newBlog);
		const updatedBlogs = await blogService.getAll();
		setBlogs(updatedBlogs);
		blogFormRef.current.toggleVisibility();

		setNotificationMessage({
			type: "success",
			message: `Added a new blog "${newBlog.title}" by ${newBlog.author}`,
		});
		setTimeout(() => {
			setNotificationMessage(null);
		}, 5000);
	};

	const loginForm = () => (
		<div className="login-form">
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					Username:{" "}
					<input
						type="text"
						value={username}
						name="username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					Password:{" "}
					<input
						type="password"
						value={password}
						name="password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);

	const blogFormRef = useRef();

	const blogForm = () => (
		<Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	);

	return (
		<div className="wrapper">
			<Notification
				message={
					notificationMessage ? notificationMessage.message : null
				}
				type={notificationMessage ? notificationMessage.type : null}
			/>
			{!user && loginForm()}
			{user && (
				<>
					<h1>Blogs</h1>
					<div className="logout-block">
						<span>{user.name} logged in</span>{" "}
						<button onClick={handleLogout}>Logout</button>
					</div>
					{blogForm()}
					<div className="blogs-block">
						{blogs.map((blog) => (
							<Blog key={blog.id} blog={blog} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default App;
