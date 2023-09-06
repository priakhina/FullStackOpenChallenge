import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
	const allUsers = [...useSelector(({ users }) => users)].sort(
		(a, b) => b.blogs.length - a.blogs.length
	);

	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th># of blogs created</th>
					</tr>
				</thead>
				<tbody>
					{allUsers.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
