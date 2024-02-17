import axios from 'axios';

const baseUrl = 'http://localhost:3000/anecdotes';

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) =>
	axios.post(baseUrl, newAnecdote).then((res) => res.data);

export const updateVote = (updateAnecdote) => {
	axios
		.put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote)
		.then((res) => res.data);
};
