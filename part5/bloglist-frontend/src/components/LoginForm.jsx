const LoginForm = (props) => {
	const { handleLogin } = props;
	const { username, handleChangeName } = props;
	const { password, handleChangePassword } = props;

	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type='text'
					value={username}
					name='Username'
					onChange={handleChangeName}
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					name='Password'
					onChange={handleChangePassword}
				/>
			</div>
			<button type='submit'>login</button>
		</form>
	);
};

export default LoginForm;
