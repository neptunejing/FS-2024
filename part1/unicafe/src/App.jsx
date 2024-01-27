import { Fragment, useState } from 'react';

const Button = (props) => {
	const { handleClick, text } = props;
	return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const Statistics = (props) => {
	const { good, neutral, bad, total } = props;
	if (total == 0)
		return (
			<Fragment>
				<h1>statistics</h1>
				<p>No feedback given</p>
			</Fragment>
		);

	const getAverage = () => {
		if (good + neutral + bad == 0) return 0;
		return (good - bad) / (good + neutral + bad);
	};

	const getPositiveRate = () => {
		if (good + neutral + bad == 0) return 0;
		return (good / (good + neutral + bad)) * 100;
	};

	return (
		<Fragment>
			<h1>statistics</h1>
			<table>
				<tbody>
					<StatisticsLine text={'good'} value={good}></StatisticsLine>
					<StatisticsLine
						text={'neutral'}
						value={neutral}></StatisticsLine>
					<StatisticsLine text={'bad'} value={bad}></StatisticsLine>
					<StatisticsLine text={'all'} value={total}></StatisticsLine>
					<StatisticsLine
						text={'average'}
						value={getAverage()}></StatisticsLine>
					<StatisticsLine
						text={'positive'}
						value={getPositiveRate()}></StatisticsLine>
				</tbody>
			</table>
		</Fragment>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [total, setTotal] = useState(0);

	const handleGoodClick = () => {
		setGood(good + 1);
		setTotal(good + neutral + bad + 1);
	};

	const handleNeutralClick = () => {
		setNeutral(neutral + 1);
		setTotal(good + neutral + bad + 1);
	};

	const handleBadClick = () => {
		setBad(bad + 1);
		setTotal(good + neutral + bad + 1);
	};

	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={handleGoodClick} text={'good'}></Button>
			<Button handleClick={handleNeutralClick} text={'neutral'}></Button>
			<Button handleClick={handleBadClick} text={'bad'}></Button>
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				total={total}></Statistics>
		</div>
	);
};

export default App;
