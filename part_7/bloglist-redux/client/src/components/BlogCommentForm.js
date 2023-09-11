import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogCommentForm = () => {
	const { id } = useParams();
	const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === id));
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");

	const addComment = async (event) => {
		event.preventDefault();

		const updatedBlog = {
			...blog,
			comments: blog.comments.concat(comment),
			user: blog.user.id,
		};
		dispatch(updateBlog(updatedBlog));
		dispatch(
			setNotification(
				"success",
				`Added a new comment to "${blog.title}" by ${blog.author}`
			)
		);

		setComment("");
	};

	return (
		blog && (
			<div className="comments-form">
				<form onSubmit={addComment}>
					<input
						type="text"
						value={comment}
						name="comment"
						onChange={({ target }) => setComment(target.value)}
					/>
					<button type="submit">Add comment</button>
				</form>
			</div>
		)
	);
};

export default BlogCommentForm;
