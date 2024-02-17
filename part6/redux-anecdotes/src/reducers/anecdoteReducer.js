import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';

const anecdoteSlice = createSlice({
	name: 'anecdote',
	initialState: [],
	reducers: {
		addVote(state, action) {
			const id = action.payload;
			const updatedAnecdote = action.payload;
			return state.map((anecdote) =>
				anecdote.id === id ? updatedAnecdote : anecdote
			);
		},
		appendAnecdote(state, action) {
			state.push(...action.payload);
		},
		initAnecdotes(state, action) {
			return action.payload;
		},
	},
});

const { initAnecdotes, appendAnecdote, addVote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdotesService.getAll();
		dispatch(initAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdotesService.createAnecdote(content);
		dispatch(appendAnecdote(newAnecdote));
	};
};

export const voteFor = (id) => {
	return async (dispatch) => {
		const updatedAnecdote = await anecdotesService.updateVote(id);
		dispatch(addVote(updatedAnecdote));
	};
};
