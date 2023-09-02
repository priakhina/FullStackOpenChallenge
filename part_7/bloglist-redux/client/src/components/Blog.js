import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, loggedUser }) => {
	const { id, title, author, url, likes, user } = blog;
	const [visible, setVisible] = useState(false);
	const buttonLabel = visible ? "hide" : "view";

	const toggleVisibility = () => setVisible(!visible);

	const dispatch = useDispatch();

	const addLike = () => {
		const updatedBlog = {
			...blog,
			likes: likes + 1,
			user: user.id,
		};

		dispatch(updateBlog(updatedBlog));
	};

	const attemptDeleteBlog = () => {
		const confirmedDelete = window.confirm(
			`Are you sure you want to delete "${title}" by ${author}?`
		);

		if (confirmedDelete) {
			dispatch(deleteBlog(id));
			dispatch(setNotification("success", `Deleted "${title}" by ${author}`));
		}
	};

	return (
		<div className="blog">
			<div>
				<strong className="blog-title">{title}</strong> -{" "}
				<i className="blog-author">{author}</i>{" "}
				<button onClick={toggleVisibility}>{buttonLabel}</button>
			</div>
			{visible && (
				<div>
					<a className="blog-url" href={url}>
						{url}
					</a>
					<p>
						likes: <span className="blog-likes">{likes}</span>{" "}
						<button onClick={addLike}>like</button>
					</p>
					<p>{user.name}</p>
					{user.username === loggedUser.username && (
						<button onClick={attemptDeleteBlog}>Delete</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Blog;
