const Blog = require('../models/blog');

const initialBlogs = [
	{
		title: 'A',
		author: 'unknown',
		url: 'localhost',
		likes: 0,
	},
	{
		title: 'B',
		author: 'unknown',
		url: 'localhost',
		likes: 0,
	},
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
