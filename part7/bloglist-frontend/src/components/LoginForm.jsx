import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/loginReducer';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (event) => {
		event.preventDefault();

		const user = {
			username: username,
			password: password,
		};
		dispatch(login(user));
		setUsername('');
		setPassword('');
		navigate('/')
	};

	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					id='username'
					type='text'
					value={username}
					name='Username'
					onChange={(event) => setUsername(event.target.value)}
				/>
			</div>
			<div>
				password
				<input
					id='password'
					type='password'
					value={password}
					name='Password'
					onChange={(event) => setPassword(event.target.value)}
				/>
			</div>
			<button id='login-button' type='submit'>
				login
			</button>
		</form>
	);
};

export default LoginForm;
