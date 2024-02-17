import AnecdoteForm from './components/AnecdoteForm';
import Anecdotes from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import anecdoteService from './services/anecdotes';
import { useDispatch } from 'react-redux';
import { initAnecdotes } from './reducers/anecdoteReducer';
import { useEffect } from 'react';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		anecdoteService
			.getAll()
			.then((anecdotes) => dispatch(initAnecdotes(anecdotes)));
	}, [dispatch]);
	return (
		<div>
			<h2>Anecdotes</h2>
			<Filter />
			<Notification />
			<Anecdotes />
			<AnecdoteForm />
		</div>
	);
};

export default App;
