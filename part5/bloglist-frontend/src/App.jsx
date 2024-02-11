import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import './index.css';
import { Component } from 'react';

const App = () => {
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [blogs, setBlogs] = useState([]);
	// login form
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	// blog form
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem('loggedUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			setErrorMessage('Wrong username or password');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}

		console.log('logging in with', username, password);
	};

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser');
		setUser(null);
	};

	const handleCreateBlog = async (event) => {
		event.preventDefault();

		try {
			const newBlog = {
				title: title,
				author: author,
				url: url,
			};
			const changedBlogs = [...blogs, newBlog];
			await blogService.create(newBlog);
			setBlogs(changedBlogs);
			setTitle('');
			setAuthor('');
			setUrl('');
			setSuccessMessage(
				`a new blog ${newBlog.title} by ${newBlog.author} added`
			);
			setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);
		} catch (error) {
			setErrorMessage(error.response.data.error);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	useEffect(() => {
		blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification
					message={successMessage || errorMessage}
					type={successMessage !== null ? 'success' : 'error'}
				/>
				<LoginForm
					handleLogin={handleLogin}
					username={username}
					handleChangeName={(event) =>
						setUsername(event.target.value)
					}
					password={password}
					handleChangePassword={(event) =>
						setPassword(event.target.value)
					}
				/>
			</div>
		);
	}
	return (
		<div>
			<h2>blogs</h2>
			<Notification
				message={successMessage || errorMessage}
				type={successMessage !== null ? 'success' : 'error'}
			/>
			<p>
				{user.username} logged in
				<button onClick={handleLogout}>logout</button>
			</p>
			<br></br>
			<h2>create new</h2>
			<BlogForm
				handleCreateBlog={handleCreateBlog}
				title={title}
				handleChangeTitle={(event) => setTitle(event.target.value)}
				author={author}
				handleChangeAuthor={(event) => setAuthor(event.target.value)}
				url={url}
				handleChangeUrl={(event) => setUrl(event.target.value)}
			/>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
