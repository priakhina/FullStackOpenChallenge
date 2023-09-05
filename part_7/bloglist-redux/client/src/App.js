import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { initializeUser, logoutUser } from "./reducers/authReducer";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth);
	const blogs = [...useSelector(({ blogs }) => blogs)].sort(
		(a, b) => b.likes - a.likes
	);

	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(initializeUser());
	}, []);

	const handleUserLogout = () => {
		dispatch(logoutUser());
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
			{!user && <LoginForm />}
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
