const Persons = ({ persons, filterString }) => {
	return persons
		.filter(({ name }) =>
			name.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
		)
		.map((person, idx) => (
			<p key={idx}>
				{person.name} {person.number}
			</p>
		));
};

export default Persons;
