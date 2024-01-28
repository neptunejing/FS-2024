import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
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

		const newPerson = {
			name: newName,
			number: newNumber,
		};
		const changedPersons = [...persons, newPerson];
		personService.create(newPerson).then(() => {
			setPersons(changedPersons);
			setNewName('');
			setNewNumber('');
		});
	};

	// initialize
	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

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
