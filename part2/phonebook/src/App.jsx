import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
	const [newName, setNewName] = useState('');
	const handleChange = (event) => {
		setNewName(event.target.value);
	};
	const addPerson = (event) => {
		event.preventDefault();
		const ifExists = persons.filter(person => person.name === newName)
		if (ifExists.length > 0) {
			alert(`${newName} is already added to phonebook`)
			return;
		}
		setPersons(persons.concat({ name: newName }));
		setNewName('');
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person, idx) => (
				<p key={idx}>{person.name}</p>
			))}
		</div>
	);
};

export default App;
