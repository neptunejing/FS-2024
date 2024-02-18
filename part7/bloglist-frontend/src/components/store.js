import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../reducers/nofiticationReducer';

const store = configureStore({
	reducer: {
		notification: notificationReducer,
	},
});

export default store;
