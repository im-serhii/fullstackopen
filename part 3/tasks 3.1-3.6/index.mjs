import express from 'express';

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

app.listen(PORT);
