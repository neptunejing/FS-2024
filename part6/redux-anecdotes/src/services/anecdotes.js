import axios from 'axios';

const baseUrl = 'http://localhost:3000/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const createAnecdote = async (content) => {
	const newAnecdote = { content: content, id: getId(), votes: 0 };
	const response = await axios.post(baseUrl, newAnecdote);
	return response.data;
};

const updateVote = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`);
	const oldAnecdote = response.data;
	const updatedAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 };
	const request = axios.put(`${baseUrl}/${id}`, updatedAnecdote);
	return request.then((response) => response.data);
};

export default { getAll, createAnecdote, updateVote };
