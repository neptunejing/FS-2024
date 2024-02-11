const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

let token = '';
let user = {};

beforeAll(async () => {
	// init users
	await User.deleteMany({});
	const userObjs = helper.initialUsers.map((user) => new User(user));
	const promiseArray = userObjs.map((user) => user.save());
	await Promise.all(promiseArray);

	// login as the first user
	user = userObjs[0];
	token = await helper.getToken(user.username);
});

beforeEach(async () => {
	await Blog.deleteMany({});
	const blogObjs = helper.initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjs.map((blog) => blog.save());
	await Promise.all(promiseArray);
});

test('get all blogs', async () => {
	const response = await api.get('/api/blogs');
	expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('add a new post', async () => {
	const newBlog = {
		title: 'a new post',
		author: 'unknown',
		url: 'localhost',
		likes: 1,
		userId: user.id,
	};
	const response = await api
		.set('Authorization', token)
		.send(newBlog);
	console.log(response.body);
	const blogsAtEnd = await helper.blogsInDb();
	const blogObjs = blogsAtEnd.map(
		({ title, author, url, likes, userId }) => ({
			title: title,
			author: author,
			url: url,
			likes: likes,
			userId: String(userId),
		})
	);
	expect(blogObjs).toContainEqual(newBlog);
});

test('id is defined', async () => {
	const response = await api.get('/api/blogs').set('Authorization', token);
	response.body.map((blog) => {
		expect(blog.id).toBeDefined();
	});
});

test('likes is set to zero by default', async () => {
	const userResponse = await api
		.get('/api/users')
		.set('Authorization', token);
	const users = userResponse.body;
	const newBlog = {
		title: 'a new post',
		author: 'unknown',
		url: 'localhost',
		userId: users[0].id,
	};
	await api.post('/api/blogs').send(newBlog).set('Authorization', token);
	const blogsAtEnd = await helper.blogsInDb();
	const blogObjs = blogsAtEnd.map(({ title, author, url, likes, user }) => ({
		title: title,
		author: author,
		url: url,
		likes: likes,
		userId: String(user),
	}));
	expect(blogObjs).toContainEqual({ ...newBlog, likes: 0 });
});

test('bad post request without title or url', async () => {
	const userResponse = await api
		.get('/api/users')
		.set('Authorization', token);
	const users = userResponse.body;
	let newBlog = {
		author: 'unknown',
		url: 'localhost',
		likes: 1,
		userId: users[0].id,
	};
	await api.post('/api/blogs').send(newBlog).set('Authorization', token);
	expect(400);
	newBlog = {
		title: 'a new post without an url',
		author: 'unknown',
		likes: 1,
		userId: users[0].id,
	};
	await api.post('/api/blogs').send(newBlog).set('Authorization', token);
	expect(400);
});

test('delete a blog', async () => {
	const blogsAtStart = await helper.blogsInDb();
	const blogTodelete = blogsAtStart[0];

	await api
		.delete(`/api/blogs/${blogTodelete.id}`)
		.set('Authorization', token);
	expect(204);
	const blogsAtEnd = await helper.blogsInDb();

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
});

test('update a blog', async () => {
	const blogsAtStart = await helper.blogsInDb();
	const blogToUpdate = { ...blogsAtStart[0], title: 'updatedBlog' };
	const response = await api
		.put(`/api/blogs/${blogToUpdate.id}`)
		.send(blogToUpdate)
		.set('Authorization', token);
	expect(response.body).toEqual(blogToUpdate);
});

afterAll(async () => {
	await mongoose.connection.close();
});
