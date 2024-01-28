import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterString, setFilterString] = useState('');

	const handleChangeName = (event) => {
		setNewName(event.target.value);
	};

	const handleChangeNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const handleChangeFilter = (event) => {
		setFilterString(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();
		const ifExists = persons.filter((person) => person.name === newName);
		if (ifExists.length > 0) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		setPersons(persons.concat({ name: newName, number: newNumber }));
		setNewName('');
		setNewNumber('');
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter
				filterString={filterString}
				handleChangeFilter={handleChangeFilter}
			/>
			<h3>Add a new</h3>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handleChangeName={handleChangeName}
				newNumber={newNumber}
				handleChangeNumber={handleChangeNumber}
			/>

			<h3>Numbers</h3>
			<Persons persons={persons} filterString={filterString} />
		</div>
	);
};

export default App;
