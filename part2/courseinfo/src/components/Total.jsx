const Total = ({ parts }) => {
	return (
		<p>
			<b>
				total of {parts.reduce((prev, curr) => curr.exercises + prev, 0)} exercises
			</b>
		</p>
	);
};

export default Total;
