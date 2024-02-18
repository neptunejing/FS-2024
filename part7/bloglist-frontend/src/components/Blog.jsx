import { useState } from 'react';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';

const Blog = ({ blog }) => {
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<button onClick={toggleVisibility}>
				{visible ? 'hide' : 'view'}
			</button>
			<div style={showWhenVisible}>
				<div>{blog.url}</div>
				<div>
					likes {blog.likes}
					<button onClick={() => dispatch(likeBlog(blog))}>
						like
					</button>
				</div>
				<div>{blog.user.name}</div>
				<button onClick={() => dispatch(removeBlog(blog.id))}>
					remove
				</button>
			</div>
		</div>
	);
};

export default Blog;
