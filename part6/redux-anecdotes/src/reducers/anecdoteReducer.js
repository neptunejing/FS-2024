import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

const anecdoteSlice = createSlice({
	name: 'anecdote',
	initialState: [],
	reducers: {
		voteFor(state, action) {
			const id = action.payload;
			const targetAnecdote = state.find((item) => item.id == id);
			const updatedAnecdote = {
				...targetAnecdote,
				votes: targetAnecdote.votes + 1,
			};
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

export const { voteFor } = anecdoteSlice.actions;
const { initAnecdotes, appendAnecdote } = anecdoteSlice.actions;
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
