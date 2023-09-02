import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	const dispatch = useDispatch();

	const blogs = [...useSelector(({ blogs }) => blogs)].sort(
		(a, b) => b.likes - a.likes
	);

	useEffect(() => {
		dispatch(initializeBlogs());

		const loggedUserJSON = window.localStorage.getItem("loggedBloglistAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleUserLogin = async (event) => {
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
			dispatch(setNotification("failure", "Wrong username or password"));
		}
	};

	const handleUserLogout = () => {
		window.localStorage.removeItem("loggedBloglistAppUser");
		setUser(null);
	};

	const handleBlogCreate = (newBlog) => {
		dispatch(createBlog(newBlog, user));
		blogFormRef.current.toggleVisibility();

		dispatch(
			setNotification(
				"success",
				`Added a new blog "${newBlog.title}" by ${newBlog.author}`
			)
		);
	};

	const blogFormRef = useRef();

	const blogForm = () => (
		<Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
			<BlogForm onBlogCreate={handleBlogCreate} />
		</Togglable>
	);

	return (
		<div className="wrapper">
			<Notification />
			{!user && (
				<LoginForm
					username={username}
					password={password}
					onUsernameChange={({ target }) => setUsername(target.value)}
					onPasswordChange={({ target }) => setPassword(target.value)}
					onUserLogin={handleUserLogin}
				/>
			)}
			{user && (
				<>
					<h1>Blogs</h1>
					<div className="logout-block">
						<span>{user.name} logged in</span>{" "}
						<button onClick={handleUserLogout}>Logout</button>
					</div>
					{blogForm()}
					<div className="blogs-block">
						{blogs.map((blog) => (
							<Blog key={blog.id} blog={blog} loggedUser={user} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default App;
