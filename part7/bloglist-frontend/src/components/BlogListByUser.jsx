import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const BlogListByUser = () => {
	const { id } = useParams();
	const { blogs, user } = useSelector((state) => ({
		blogs: state.blogs.filter((blog) => blog.user.id == id),
		user: state.users.find((user) => user.id == id),
	}));

	return (
		<div>
			<h2>{user.username}</h2>
			<h3>added blogs</h3>
			<ul>
				{blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	);
};

export default BlogListByUser;
