import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [blogTitle, setBlogTitle] = useState("");
	const [blogAuthor, setBlogAuthor] = useState("");
	const [blogUrl, setBlogUrl] = useState("");
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
		setBlogTitle("");
		setBlogAuthor("");
		setBlogUrl("");
	};

	const addBlog = async (event) => {
		event.preventDefault();

		const newBlog = {
			title: blogTitle,
			author: blogAuthor,
			url: blogUrl,
		};

		const addedBlog = await blogService.create(newBlog);
		setBlogs(blogs.concat(addedBlog));
		blogFormRef.current.toggleVisibility();

		setNotificationMessage({
			type: "success",
			message: `Added a new blog "${blogTitle}" by ${blogAuthor}`,
		});
		setTimeout(() => {
			setNotificationMessage(null);
		}, 5000);

		setBlogTitle("");
		setBlogAuthor("");
		setBlogUrl("");
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

	const blogForm = () => {
		return (
			<Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
				<div className="create-new-blog-form">
					<h2>Create a new blog</h2>
					<form onSubmit={addBlog}>
						<div>
							Title:{" "}
							<input
								type="text"
								value={blogTitle}
								name="blog-title"
								onChange={({ target }) =>
									setBlogTitle(target.value)
								}
							/>
						</div>
						<div>
							Author:{" "}
							<input
								type="text"
								value={blogAuthor}
								name="blog-author"
								onChange={({ target }) =>
									setBlogAuthor(target.value)
								}
							/>
						</div>
						<div>
							Url:{" "}
							<input
								type="text"
								value={blogUrl}
								name="blog-url"
								onChange={({ target }) =>
									setBlogUrl(target.value)
								}
							/>
						</div>
						<button type="submit">Create</button>
					</form>
				</div>
			</Togglable>
		);
	};

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
