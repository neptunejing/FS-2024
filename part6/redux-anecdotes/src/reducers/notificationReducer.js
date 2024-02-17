import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		show(state, action) {
			return action.payload;
		},
	},
});

export const { show } = notificationSlice.actions;
export default notificationSlice.reducer;

export const showNotification = (message, delay) => {
	return async (dispatch) => {
		dispatch(show(message));
		setTimeout(() => {
			dispatch(show(''));
		}, delay * 1000);
	};
};
