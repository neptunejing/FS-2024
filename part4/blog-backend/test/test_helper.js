const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const initialBlogs = [
	{
		// eslint-disable-next-line quotes
		title: "Things I Don't know as of 2018",
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
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

const getToken = async (username) => {
	const user = await User.findOne({ username });

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, process.env.SECRET, {
		expiresIn: 60 * 60,
	});

	return 'Bearer: ' + token;
};

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb, getToken };
