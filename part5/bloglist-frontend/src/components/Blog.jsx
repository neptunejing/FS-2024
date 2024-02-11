import { useState } from 'react';

const Blog = ({ blog, updateBlog, removeBlog }) => {
	const [visible, setVisible] = useState(false);
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const handleLike = () => {
		updateBlog(blog.id, {
			...blog,
			user: blog.user.id,
			likes: blog.likes + 1,
		});
	};

	const handleRemove = () => {
		removeBlog(blog.id, blog);
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
					<button onClick={handleLike}>like</button>
				</div>
				<div>{blog.user.name}</div>
				<button onClick={handleRemove}>remove</button>
			</div>
		</div>
	);
};

export default Blog;
