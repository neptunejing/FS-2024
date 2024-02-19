import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const usersSlice = createSlice({
	name: 'login',
	initialState: [],
	reducers: {
		getAllUsersReducer(state, action) {
			return action.payload;
		},
	},
});

const { getAllUsersReducer } = usersSlice.actions;

export const getAllUsers = () => {
	return async (dispatch) => {
		const users = await usersService.getAll();
		dispatch(getAllUsersReducer(users));
	};
};

export default usersSlice.reducer;
