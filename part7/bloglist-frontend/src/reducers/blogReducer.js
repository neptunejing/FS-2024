import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';
import { showNotification } from './nofiticationReducer';

const blogSlice = createSlice({
	name: 'blog',
	initialState: [],
	reducers: {
		initReducer(state, action) {
			return action.payload;
		},
		likeReducer(state, action) {
			const id = action.payload;
			const targetBlog = state.find((blog) => blog.id === id);
			const updatedBlog = {
				...targetBlog,
				likes: targetBlog.likes + 1,
			};
			return state.map((blog) => (blog.id === id ? updatedBlog : blog));
		},
		appendReducer(state, action) {
			state.push(action.payload);
		},
		removeReducer(state, action) {
			const removeBlogId = action.payload;
			return state.filter((blog) => blog.id !== removeBlogId);
		},
	},
});

const { initReducer, likeReducer, removeReducer } = blogSlice.actions;

export const initBlogs = () => {
	return async (dispatch) => {
		try {
			const blogs = await blogsService.getAll();
			dispatch(initReducer(blogs));
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

export const removeBlog = (removedBlogId) => {
	return async (dispatch) => {
		try {
			await blogsService.remove(removedBlogId);
			dispatch(removeReducer(removedBlogId));
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

export const likeBlog = (likedBlog) => {
	return async (dispatch) => {
		try {
			await blogsService.update(likedBlog.id, {
				...likedBlog,
				user: likedBlog.user.id,
				likes: likedBlog.likes + 1,
			});
			dispatch(likeReducer(likedBlog.id));
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

export const createBlog = (newBlog) => {
	return async (dispatch) => {
		try {
			await blogsService.create(newBlog);
			const blogs = await blogsService.getAll();
			dispatch(initReducer(blogs));
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

export default blogSlice.reducer;
