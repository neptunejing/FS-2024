import { useSelector, useDispatch } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';

const Anecdotes = () => {
	const anecdotes = useSelector((state) => {
		const { filter, anecdotes } = state;
		if (filter == null) {
			return anecdotes.sort((a, b) => b.votes - a.votes);
		}
		return anecdotes
			.filter((anecdote) =>
				anecdote.content.toLowerCase().includes(filter.toLowerCase())
			)
			.sort((a, b) => b.votes - a.votes);
	});
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(voteFor(id));
	};

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Anecdotes;
