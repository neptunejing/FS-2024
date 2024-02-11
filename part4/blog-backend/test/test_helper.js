const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
	{
		title: 'Things I Don\'t know as of 2018',
		author: 'Dan Anrramov',
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

const initialUsers = [
	{
		username: 'mluukkai',
		name: 'Matti Luukkainen',
		password: 'asd14sag',
	},
	{
		username: 'hellas',
		name: 'Arto Hellas',
		password: 'D341asf2',
	},
	{
		username: 'root',
		name: 'Superuser',
		password: 'salainen',
	},
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb };
