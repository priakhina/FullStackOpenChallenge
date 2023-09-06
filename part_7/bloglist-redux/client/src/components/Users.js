import { useSelector } from "react-redux";

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
							<td>{user.name}</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
