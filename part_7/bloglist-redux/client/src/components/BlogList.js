import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
	const user = useSelector(({ auth }) => auth);
	const blogs = [...useSelector(({ blogs }) => blogs)].sort(
		(a, b) => b.likes - a.likes
	);

	return (
		<div className="blogs-block">
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} loggedUser={user} />
			))}
		</div>
	);
};

export default BlogList;
