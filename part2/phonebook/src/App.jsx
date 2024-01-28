import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

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
		setPersons(persons.concat({ name: newName, number: newNumber, idx: persons.length + 1}));
		setNewName('');
		setNewNumber('');
	};

	useEffect(() => {
		axios.get('http://localhost:3000/persons').then((response) => {
			setPersons(response.data);
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
