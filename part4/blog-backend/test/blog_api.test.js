const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
	await Blog.deleteMany({});
	const blogObjs = helper.initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjs.map((blog) => blog.save());
	await Promise.all(promiseArray);
}, 100000);

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
	};
	await api.post('/api/blogs').send(newBlog);
	const response = await api.get('/api/blogs');
	const blogObjs = response.body.map(({ title, author, url, likes }) => ({
		title: title,
		author: author,
		url: url,
		likes: likes,
	}));
	expect(blogObjs).toContainEqual(newBlog);
});

test('id is defined', async () => {
	const response = await api.get('/api/blogs');
	response.body.map((blog) => {
		expect(blog.id).toBeDefined();
	});
});

test('likes is set to zero by default', async () => {
	const newBlog = {
		title: 'a new 0-likes post',
		author: 'unknown',
		url: 'localhost',
	};
	await api.post('/api/blogs').send(newBlog);
	const response = await api.get('/api/blogs');
	const blogObjs = response.body.map(({ title, author, url, likes }) => ({
		title: title,
		author: author,
		url: url,
		likes: likes,
	}));
	expect(blogObjs).toContainEqual({ ...newBlog, likes: 0 });
});

test('bad post request without title or url', async () => {
	let newBlog = {
		author: 'unknown',
		url: 'localhost',
	};
	await api.post('/api/blogs').send(newBlog).expect(400);
	newBlog = {
		title: 'a new blog without an url',
		author: 'unknown',
	};
	await api.post('/api/blogs').send(newBlog).expect(400);
});

test('delete a blog', async () => {
	const blogsAtStart = await helper.blogsInDb();
	const blogTodelete = blogsAtStart[0];

	await api.delete(`/api/blogs/${blogTodelete.id}`).expect(204);
	const blogsAtEnd = await helper.blogsInDb();

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
});

test('update a blog', async () => {
	const blogsAtStart = await helper.blogsInDb();
	const blogToUpdate = { ...blogsAtStart[0], title: 'updatedBlog' };
	const response = await api
		.put(`/api/blogs/${blogToUpdate.id}`)
		.send(blogToUpdate);
	expect(response.body).toEqual(blogToUpdate);
});

afterAll(async () => {
	await mongoose.connection.close();
});
