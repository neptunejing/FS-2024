const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {
		username: 1,
		name: 1,
	});
	response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

blogsRouter.post('', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (decodedToken.id === request.user.id.toString()) {
		const body = request.body;
		const user = request.user;
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: user.id,
		});
		const savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();
		response.status(201).json(savedBlog);
	} else {
		response.status(401).json({ error: 'token invalid' });
	}
});

blogsRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (decodedToken.id === request.user.id.toString()) {
		await Blog.findByIdAndDelete(request.params.id);
		response.status(204).end();
	} else {
		response.status(401).json({ error: 'token invalid' });
	}
});

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body;
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: body.user,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	});
	response.json(updatedBlog);
});

module.exports = blogsRouter;
