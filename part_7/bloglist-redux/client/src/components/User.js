import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
	const { id } = useParams();
	const user = useSelector(({ users }) => users.find((user) => user.id === id));

	return (
		user && (
			<div>
				<h2>{user.name}</h2>
				<h3>Added blogs</h3>
				<ul>
					{user.blogs.map((blog) => (
						<li key={blog.id}>{blog.title}</li>
					))}
				</ul>
				{!user.blogs.length && <p>No blogs have been created yet...</p>}
			</div>
		)
	);
};

export default User;
