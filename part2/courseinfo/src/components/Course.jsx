import { Fragment } from 'react';
import Header from './Header';
import Part from './Part';
import Total from './Total';

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
            <Total parts={parts}></Total>
		</Fragment>
	);
};

export default Course;
