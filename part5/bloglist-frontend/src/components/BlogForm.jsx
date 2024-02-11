const BlogForm = (props) => {
	const { handleCreateBlog } = props;
	const { title, handleChangeTitle } = props;
	const { author, handleChangeAuthor } = props;
	const { url, handleChangeUrl } = props;

	return (
		<form onSubmit={handleCreateBlog}>
			<div>
				title: <input value={title} onChange={handleChangeTitle} />
			</div>
			<div>
				author: <input value={author} onChange={handleChangeAuthor} />
			</div>
			<div>
				url: <input value={url} onChange={handleChangeUrl} />
			</div>
			<div>
				<button type='submit'>create</button>
			</div>
		</form>
	);
};

export default BlogForm;
