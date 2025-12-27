import express from 'express';
import morgan from "morgan";

let persons = [
	{
		"id": "1",
		"name": "Arto Hellas",
		"number": "040-123456"
	},
	{
		"id": "2",
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": "3",
		"name": "Dan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": "4",
		"name": "Mary Poppendieck",
		"number": "39-23-6423122"
	}
]

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get('/api/persons', (req, res) => {
	res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
	const id = req.params.id
	const person = persons.find(p => p.id === id)
	if (!person) {
		res.status(404).json({error: 'No such person'})
		return;
	}
	res.json(person);
})

app.get('/info', (req, res) => {
	const date = new Date().toString();
	res.send(`
	<p>phonebook has info for ${persons.length} persons</p> 
	<p>${date}</p>
	`);
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id;

	persons = persons.filter(p => p.id !== id);

	res.status(204).end();
})

app.post('/api/persons', (req, res) => {
	const person = req.body;
	const id = Math.floor(Math.random() * 1000000);

	if (!person.name) {
		res.status(400).json({ error: 'a name is required' });
		return
	} else if (!person.number) {
		res.status(400).json({ error: 'a number is required' });
		return
	}

	if (persons.some(p => p.name === person.name)) {
		res.status(400).json({ error: 'name must be unique' })
		return
	}

	const newPerson = {
		id: String(id + 1),
		name: person.name,
		number: person.number,
	}

	persons = persons.concat(newPerson)

	res.status(201).json(newPerson).end()
})

app.listen(PORT);
