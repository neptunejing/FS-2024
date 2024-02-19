import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserList = () => {
	const users = useSelector((state) => {
		const users = [...state.users];
		return users.sort((a, b) => b.blogs.length - a.blogs.length);
	});

	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<Link to={`/users/${user.id}`}>
								<td>{user.username}</td>
							</Link>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserList;
