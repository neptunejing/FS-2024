import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = () => {
	const blogs = useSelector((state) => {
		const blogs = [...state.blogs];
		return blogs.sort((a, b) => b.likes - a.likes);
	});

	return (
		<div>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default BlogList;
