const express = require('express');
const cors = require('cors');
morgan = require('morgan');

const app = express();

app.use(express.static('dist'))
app.use(cors());
app.use(express.json());
app.use(
	morgan((tokens, req, res) => {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, 'content-length'),
			'-',
			tokens['response-time'](req, res),
			'ms',
			Object.keys(req.body).length && JSON.stringify(req.body),
		].join(' ');
	})
);

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

app.get('/api/persons', (req, res) => {
	res.json(persons);
});

const generateDate = () => {
	const date = new Date();
	const options = {
		weekday: 'short',
		month: 'short',
		day: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZoneName: 'long',
	};
	return date.toLocaleString('en-US', options);
};

app.get('/info', (req, res) => {
	let cnt = persons.length;
	res.send(`Phonebook has info for ${cnt} people<p>${generateDate()}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
});

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	persons = persons.filter((person) => person.id !== id);
	res.status(204).end();
});

app.post('/api/persons', (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res.status(400).json({
			error: 'name or number is missing',
		});
	}
	if (persons.find((person) => person.name === body.name)) {
		return res.status(400).json({
			error: 'name must be unique',
		});
	}

	const person = {
		name: body.name,
		number: body.number,
		id: Math.floor(10000 * Math.random()),
	};

	persons = persons.concat(person);

	res.json(person);
});

const PORT = process.env.PORT|| 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
