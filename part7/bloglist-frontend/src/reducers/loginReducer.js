import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogsService from '../services/blogs';
import usersService from '../services/users';
import { showNotification } from './nofiticationReducer';

const loginSlice = createSlice({
	name: 'login',
	initialState: null,
	reducers: {
		setUserReducer(state, action) {
			return action.payload;
		},
	},
});

export const { setUserReducer } = loginSlice.actions;

export const login = (userObj) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login(userObj);
			window.localStorage.setItem('loggedUser', JSON.stringify(user));
			blogsService.setToken(user.token);
			dispatch(setUserReducer(user));
		} catch (error) {
			dispatch(
				showNotification({
					message: error.response.data.error,
					type: 'error',
				})
			);
			setTimeout(() => {
				dispatch(showNotification(null));
			}, 5000);
		}
	};
};

export default loginSlice.reducer;
