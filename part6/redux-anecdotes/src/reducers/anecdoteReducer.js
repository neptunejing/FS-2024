const anecdotesAtStart = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
	console.log('state now: ', state);
	console.log('action', action);

	let id = 0;
	let targetAnecdote = null;
	let updatedAnecdote = null;

	switch (action.type) {
		case 'VOTE_FOR':
			id = action.payload.id;
			targetAnecdote = state.find((item) => item.id === id);
			updatedAnecdote = {
				...targetAnecdote,
				votes: targetAnecdote.votes + 1,
			};
			return state.map((anecdote) =>
				anecdote.id === id ? updatedAnecdote : anecdote
			);
		case 'CREATE_ANECDOTE':
			return [...state, action.payload];
		default:
			return state;
	}
};

export const voteFor = (id) => {
	return {
		type: 'VOTE_FOR',
		payload: { id },
	};
};

export const createAnecdote = (anecdote) => {
	return {
		type: 'CREATE_ANECDOTE',
		payload: {
			content: anecdote,
			id: getId(),
			votes: 0,
		},
	};
};

export default reducer;
