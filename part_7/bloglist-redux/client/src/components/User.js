import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

const User = () => {
	const allUsers = useSelector(({ users }) => users);
	const match = useMatch("/users/:id");
	const user = match
		? allUsers.find((user) => user.id === match.params.id)
		: null;

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
