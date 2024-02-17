import { createSlice } from '@reduxjs/toolkit';

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
		createAnecdote(state, action) {
			state.push(asObject(action.payload));
		},
		initAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { voteFor, createAnecdote, initAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
