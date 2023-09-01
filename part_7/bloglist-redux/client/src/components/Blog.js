import { useState } from "react";

const Blog = ({ blog, loggedUser, onBlogUpdate, onBlogDelete }) => {
	const { title, author, url, likes, user } = blog;
	const [visible, setVisible] = useState(false);
	const buttonLabel = visible ? "hide" : "view";

	const toggleVisibility = () => setVisible(!visible);

	const addLike = () => {
		onBlogUpdate({
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
			onBlogDelete(blog);
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
