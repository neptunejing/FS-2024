import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = () => {
	const blogs = useSelector((state) => {
		const blogs = [...state.blogs];
		return blogs.sort((a, b) => b.likes - a.likes);
	});

	const style = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div>
			{blogs.map((blog) => (
				<h2 style={style} key={blog.id}>
					<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
				</h2>
			))}
		</div>
	);
};

export default BlogList;
