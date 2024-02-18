const LoginForm = (props) => {
	const { handleLogin } = props;
	const { username, handleChangeName } = props;
	const { password, handleChangePassword } = props;

	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					id='username'
					type='text'
					value={username}
					name='Username'
					onChange={handleChangeName}
				/>
			</div>
			<div>
				password
				<input
					id='password'
					type='password'
					value={password}
					name='Password'
					onChange={handleChangePassword}
				/>
			</div>
			<button id='login-button' type='submit'>
				login
			</button>
		</form>
	);
};

export default LoginForm;
