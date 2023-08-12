import { useState } from "react";

const Blog = ({ blog, loggedUser, updateBlog, deleteBlog }) => {
	const { id, title, author, url, likes, user } = blog;
	const [visible, setVisible] = useState(false);
	const buttonLabel = visible ? "hide" : "view";

	const toggleVisibility = () => setVisible(!visible);

	const addLike = () => {
		updateBlog(id, {
			...blog,
			likes: likes + 1,
			user: user.id,
		});
	};

	const attemptDeleteBlog = () => {
		const confirmedDelete = window.confirm(
			`Are you sure you want to delete "${title}" by ${author}?`
		);

		if (confirmedDelete) {
			deleteBlog(id, blog);
		}
	};

	return (
		<div className="blog">
			<div>
				<strong>{title}</strong> - <i>{author}</i>{" "}
				<button onClick={toggleVisibility}>{buttonLabel}</button>
			</div>
			{visible && (
				<div>
					<a href={url}>{url}</a>
					<p>
						likes: {likes} <button onClick={addLike}>like</button>
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
