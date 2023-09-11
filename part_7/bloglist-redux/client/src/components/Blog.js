import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = () => {
	const { id } = useParams();
	const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === id));
	const loggedUser = useSelector(({ auth }) => auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const addLike = () => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id,
		};

		dispatch(updateBlog(updatedBlog));
	};

	const attemptDeleteBlog = () => {
		const isConfirmedDelete = window.confirm(
			`Are you sure you want to delete "${blog.title}" by ${blog.author}?`
		);

		if (isConfirmedDelete) {
			dispatch(deleteBlog(id));
			dispatch(
				setNotification("success", `Deleted "${blog.title}" by ${blog.author}`)
			);
			navigate("/");
		}
	};

	return (
		blog && (
			<div className="blog">
				<h2>
					<span className="blog-title">{blog.title}</span>{" "}
					<i className="blog-author">by {blog.author}</i>
				</h2>
				<div className="blog-contents">
					<a className="blog-url" href={blog.url}>
						{blog.url}
					</a>
					<p>
						<span className="blog-likes">{blog.likes}</span>{" "}
						{blog.likes === 1 ? "like" : "likes"}{" "}
						<button onClick={addLike}>like</button>
					</p>
					<p>Added by {blog.user.name}</p>
					{blog.user.username === loggedUser.username && (
						<button onClick={attemptDeleteBlog}>Delete</button>
					)}
				</div>
				<div className="blog-comments">
					<h3>Comments</h3>
					<ul className="comments-list">
						{blog.comments.map((comment, index) => (
							<li className="comment" key={index}>
								{comment}
							</li>
						))}
					</ul>
					{!blog.comments.length && <p>No comments have been added yet...</p>}
				</div>
			</div>
		)
	);
};

export default Blog;
