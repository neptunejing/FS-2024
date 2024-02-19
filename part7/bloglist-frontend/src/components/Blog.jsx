import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Blog = () => {
	const dispatch = useDispatch();
	const { blogId } = useParams();
	const blog = useSelector((state) =>
		state.blogs.find((blog) => blog.id == blogId)
	);

	return (
		<div>
			<h1>{blog.title}</h1>
			<div>
				<Link>{blog.url}</Link>
				<div>
					likes {blog.likes}
					<button onClick={() => dispatch(likeBlog(blog))}>
						like
					</button>
				</div>
				<div>added by {blog.user.name}</div>
			</div>
		</div>
	);
};

export default Blog;
