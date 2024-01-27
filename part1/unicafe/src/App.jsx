import { useState } from 'react';

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

	const getAverage = () => {
		if (good + neutral + bad == 0) return 0;
		return (good - bad) / (good + neutral + bad);
	};

	const getPositiveRate = () => {
		if (good + neutral + bad == 0) return 0;
		return (good / (good + neutral + bad)) * 100;
	};

	return (
		<div>
			<h1>give feedback</h1>
			<button onClick={() => handleGoodClick()}>good</button>
			<button onClick={handleNeutralClick}>neutral</button>
			<button onClick={handleBadClick}>bad</button>
			<h1>statistics</h1>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {total}</p>
			<p>average {getAverage()}</p>
			<p>positive {getPositiveRate()}%</p>
		</div>
	);
};

export default App;
