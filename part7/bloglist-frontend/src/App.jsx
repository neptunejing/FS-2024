import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import { initBlogs } from './reducers/blogReducer';
import { setUserReducer, login } from './reducers/userReducer';
import { useSelector } from 'react-redux';

const App = () => {
	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initBlogs());
	}, [dispatch]);

	// refs
	const blogFormRef = useRef();

	// init user
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatch(setUserReducer(user));
			blogService.setToken(user.token);
		}
	}, [dispatch]);

	if (user == null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification />
				<LoginForm />
			</div>
		);
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser');
		dispatch(setUserReducer(null));
	};

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
