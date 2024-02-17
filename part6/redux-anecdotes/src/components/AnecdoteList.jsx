import { useSelector, useDispatch } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const Anecdotes = () => {
	const anecdotes = useSelector((state) => {
		const { filter } = state;
		const anecdotes = [...state.anecdotes];
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

	const vote = (id, content) => {
		dispatch(voteFor(id));
		dispatch(showNotification(`You voted '${content}' !`), 5);
	};

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button
							onClick={() => vote(anecdote.id, anecdote.content)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Anecdotes;
