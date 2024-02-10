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

module.exports = { initialBlogs };
