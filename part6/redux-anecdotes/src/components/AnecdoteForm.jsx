import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = (event) => {
		event.preventDefault();
		const content = event.target.anecdotes.value;
		event.target.anecdotes.value = '';
		dispatch(createAnecdote(content));
		dispatch(showNotification(`You created "${content}"!`));
		setTimeout(() => {
			dispatch(showNotification(''));
		}, 5000);
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name='anecdotes' />
				</div>
				<button>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
