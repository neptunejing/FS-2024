import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import { showNotification } from './reducers/nofiticationReducer';
import { initBlogs } from './reducers/blogReducer';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initBlogs());
	}, [dispatch]);

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
			dispatch(
				showNotification({
					message: 'Wrong username or password',
					type: 'error',
				})
			);
			setTimeout(() => {
				dispatch(showNotification(null));
			}, 5000);
		}

		console.log('logging in with', username, password);
	};

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser');
		setUser(null);
	};

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
				<Notification />
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
			<Notification />
			<p>
				{user.username} logged in
				<button onClick={handleLogout}>logout</button>
			</p>
			<br></br>
			<Togglable buttonLabel='new note' ref={blogFormRef}>
				<h2>create new</h2>
				<BlogForm />
			</Togglable>
			<BlogList />
		</div>
	);
};

export default App;
