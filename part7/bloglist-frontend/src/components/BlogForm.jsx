import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { showNotification } from '../reducers/nofiticationReducer';

const BlogForm = () => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleCreateBlog = (event) => {
		event.preventDefault();
		const newBlog = {
			title: title,
			author: author,
			url: url,
		};
		dispatch(createBlog(newBlog));
		dispatch(
			showNotification({
				message: `a new blog ${title} by ${author} added`,
				type: 'success',
			})
		);
		setTimeout(() => {
			dispatch(showNotification(null));
		}, 5000);
		setTitle('');
		setAuthor('');
		setUrl('');
	};

	return (
		<form onSubmit={handleCreateBlog}>
			<div>
				title:{' '}
				<input
					id='title'
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
			</div>
			<div>
				author:{' '}
				<input
					id='author'
					value={author}
					onChange={(event) => setAuthor(event.target.value)}
				/>
			</div>
			<div>
				url:{' '}
				<input
					id='url'
					value={url}
					onChange={(event) => setUrl(event.target.value)}
				/>
			</div>
			<div>
				<button id='create' type='submit'>
					create
				</button>
			</div>
		</form>
	);
};

export default BlogForm;
