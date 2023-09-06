import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
	const blogs = [...useSelector(({ blogs }) => blogs)].sort(
		(a, b) => b.likes - a.likes
	);

	return (
		<div className="blog-list">
			{blogs.map((blog) => (
				<Link key={blog.id} to={`/blogs/${blog.id}`}>
					{blog.title}
				</Link>
			))}
		</div>
	);
};

export default BlogList;
