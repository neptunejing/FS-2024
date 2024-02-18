import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
	// blog form
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleCreateBlog = (event) => {
		event.preventDefault();
		createBlog({
			title: title,
			author: author,
			url: url,
		});
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
