import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = ({ onBlogCreate }) => {
	const dispatch = useDispatch();
	const loggedUser = useSelector(({ auth }) => auth);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const addBlog = (event) => {
		event.preventDefault();

		const newBlog = { title, author, url };
		dispatch(createBlog(newBlog, loggedUser));
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
			<h3>Create a new blog</h3>
			<Form onSubmit={addBlog}>
				<Row>
					<Col md={6} lg={5} xl={4}>
						<Form.Group className="mb-3" controlId="blog-title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={title}
								name="blog-title"
								onChange={({ target }) => setTitle(target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={6} lg={5} xl={4}>
						<Form.Group className="mb-3" controlId="blog-author">
							<Form.Label>Author</Form.Label>
							<Form.Control
								type="text"
								value={author}
								name="blog-author"
								onChange={({ target }) => setAuthor(target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={6} lg={5} xl={4}>
						<Form.Group className="mb-3" controlId="blog-url">
							<Form.Label>URL</Form.Label>
							<Form.Control
								type="text"
								value={url}
								name="blog-url"
								onChange={({ target }) => setUrl(target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Button variant="primary" type="submit">
					Create
				</Button>
			</Form>
		</div>
	);
};

export default BlogForm;
