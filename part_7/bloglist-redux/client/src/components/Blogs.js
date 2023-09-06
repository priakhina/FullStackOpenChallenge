import { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";

const Blogs = () => {
	const blogFormRef = useRef();

	return (
		<>
			<Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
				<BlogForm onBlogCreate={() => blogFormRef.current.toggleVisibility()} />
			</Togglable>
			<BlogList />
		</>
	);
};

export default Blogs;
