import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import { initBlogs } from './reducers/blogReducer';
import { setUserReducer } from './reducers/loginReducer';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import { getAllUsers } from './reducers/usersReducer';
import BlogListByUser from './components/BlogListByUser';
import Blog from './components/Blog';

const App = () => {
	const loggedUser = useSelector((state) => state.login);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initBlogs());
		dispatch(getAllUsers());
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

	if (loggedUser == null) {
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
				{loggedUser.username} logged in
				<button onClick={handleLogout}>logout</button>
			</p>
			<Togglable buttonLabel='new note' ref={blogFormRef}>
				<h2>create new</h2>
				<BlogForm />
			</Togglable>
			<Routes>
				<Route path='/' element={<BlogList />}></Route>
				<Route path='/users' element={<UserList />}></Route>
				<Route path='/users/:userId' element={<BlogListByUser />} />
				<Route path='/blogs/:blogId' element={<Blog />} />
			</Routes>
		</div>
	);
};

export default App;
