import { Fragment } from 'react';
import Header from './Header';
import Part from './Part';

const Course = ({ course }) => {
	const { name, parts } = course;
	return (
		<Fragment>
			<Header name={name} />
			{parts.map((part, idx) => (
				<Part
					key={idx}
					name={part.name}
					exercises={part.exercises}></Part>
			))}
		</Fragment>
	);
};

export default Course;
