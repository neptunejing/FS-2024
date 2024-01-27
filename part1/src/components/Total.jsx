import { Fragment } from 'react';

const Total = (props) => {
	return (
		<Fragment>
			<p>
				Number of exercises{' '}
				{props.exercises1 + props.exercises2 + props.exercises3}
			</p>
		</Fragment>
	);
};

export default Total;
