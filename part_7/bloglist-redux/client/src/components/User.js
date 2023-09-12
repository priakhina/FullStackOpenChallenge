import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { JournalText } from "react-bootstrap-icons";

const User = () => {
	const { id } = useParams();
	const user = useSelector(({ users }) => users.find((user) => user.id === id));

	return (
		user && (
			<>
				<h2>{user.name}</h2>
				<h3>Added blogs</h3>
				<ul className="user-blogs-list">
					{user.blogs.map((blog) => (
						<li className="blog" key={blog.id}>
							<JournalText className="journal-icon" />
							<span>{blog.title}</span>
						</li>
					))}
				</ul>
				{!user.blogs.length && <p>No blogs have been created yet...</p>}
			</>
		)
	);
};

export default User;
