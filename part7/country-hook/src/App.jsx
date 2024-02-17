import React, { useState, useEffect } from 'react';
import { useCountry, useField } from '../hooks';

const Country = ({ data }) => {
	if (!data) {
		return <div>not found...</div>;
	}

	return (
		<div>
			<h3>{data.name.common} </h3>
			<div>capital {data.capital} </div>
			<div>population {data.population}</div>
			<img
				src={data.flags.png}
				height='100'
				alt={`${data.flags.alt}`}
			/>
		</div>
	);
};

const App = () => {
	const nameInput = useField('text');
	const [name, setName] = useState('');
	const country = useCountry(name);

	const fetch = (e) => {
		e.preventDefault();
		setName(nameInput.value);
	};

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button>find</button>
			</form>

			<Country country={country} />
		</div>
	);
};

export default App;
