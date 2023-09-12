import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Heart, ChatRightTextFill, Trash3Fill } from "react-bootstrap-icons";
import { updateBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import BlogCommentForm from "./BlogCommentForm";

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
					<span className="blog-author">by {blog.author}</span>
				</h2>
				<div className="blog-contents">
					<a className="blog-url" href={blog.url}>
						{blog.url}
					</a>
					<div className="blog-likes">
						<p>
							{blog.likes} {blog.likes === 1 ? "like" : "likes"}
						</p>
						<Button id="add-like-button" onClick={addLike}>
							<Heart className="heart-icon" /> Like
						</Button>
					</div>
					<p className="blog-user">Added by {blog.user.name}</p>
					{blog.user.username === loggedUser.username && (
						<Button id="delete-blog-button" onClick={attemptDeleteBlog}>
							<Trash3Fill className="trash-icon" /> Delete
						</Button>
					)}
				</div>
				<div className="blog-comments">
					<h3>Comments</h3>
					<BlogCommentForm />
					<ul className="comments-list">
						{blog.comments.map((comment, index) => (
							<li className="comment" key={index}>
								<ChatRightTextFill className="chat-icon" />
								<span>{comment}</span>
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
