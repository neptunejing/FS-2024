import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import './index.css';

const App = () => {
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [blogs, setBlogs] = useState([]);
	// login form
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	// refs
	const blogFormRef = useRef();

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

	const createBlog = async (blogObj) => {
		try {
			const { title, author } = blogObj;
			await blogService.create(blogObj);
			const blogs = await blogService.getAll();
			blogFormRef.current.toggleVisibility();
			setBlogs(blogs.sort((a, b) => b.likes - a.likes));
			setSuccessMessage(`a new blog ${title} by ${author} added`);
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

	const updateBlog = async (id, blogObj) => {
		try {
			await blogService.update(id, blogObj);
			const blogs = await blogService.getAll();
			setBlogs(blogs.sort((a, b) => b.likes - a.likes));
		} catch (error) {
			setErrorMessage(error.response.data.error);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const removeBlog = async (id, blogObj) => {
		if (
			window.confirm(`Remove blog ${blogObj.title} by ${blogObj.author}`)
		) {
			try {
				await blogService.remove(id);
				const blogs = await blogService.getAll();
				setBlogs(blogs.sort((a, b) => b.likes - a.likes));
			} catch (error) {
				setErrorMessage(error.response.data.error);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			}
		}
	};

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
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
			<Togglable buttonLabel='new note' ref={blogFormRef}>
				<h2>create new</h2>
				<BlogForm createBlog={createBlog} />
			</Togglable>
			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					updateBlog={updateBlog}
					removeBlog={removeBlog}
				/>
			))}
		</div>
	);
};

export default App;
