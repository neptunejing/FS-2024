import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

const App = () => {
	const course = 'Half Stack application development';
	const part1 = {
		name: 'Fundamentals of React',
		exercises: 10,
	};
	const part2 = {
		name: 'Using props to pass data',
		exercises: 7,
	};
	const part3 = {
		name: 'State of a component',
		exercises: 14,
	};

	return (
		<div>
			<Header course={course}></Header>
			<Content
				part1={part1.name}
				exercises1={part1.exercises}
				part2={part2.name}
				exercises2={part2.exercises}
				part3={part3.name}
				exercises3={part2.exercises}></Content>
			<Total
				exercises1={part1.exercises}
				exercises2={part1.exercises}
				exercises3={part1.exercises}></Total>
		</div>
	);
};

export default App;
