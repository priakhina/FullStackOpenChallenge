import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
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
			<Form className="comments-form" onSubmit={addComment}>
				<Form.Control
					type="text"
					value={comment}
					name="comment"
					onChange={({ target }) => setComment(target.value)}
				/>
				<Button id="add-comment-button" type="submit">
					Add comment
				</Button>
			</Form>
		)
	);
};

export default BlogCommentForm;
