import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = ({ onBlogCreate }) => {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const addBlog = (event) => {
		event.preventDefault();

		const newBlog = { title, author, url };
		dispatch(createBlog(newBlog, user));
		dispatch(
			setNotification("success", `Added a new blog "${title}" by ${author}`)
		);
		onBlogCreate();

		setTitle("");
		setAuthor("");
		setUrl("");
	};

	return (
		<div className="create-new-blog-form">
			<h2>Create a new blog</h2>
			<form onSubmit={addBlog}>
				<div>
					Title:{" "}
					<input
						type="text"
						value={title}
						name="blog-title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					Author:{" "}
					<input
						type="text"
						value={author}
						name="blog-author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					Url:{" "}
					<input
						type="text"
						value={url}
						name="blog-url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default BlogForm;
