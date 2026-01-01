import express from 'express';
import morgan from "morgan";
import Person from "./models/person.mjs";

morgan.token('body', (req, res) => {
	if (req.method === 'POST') {
		return JSON.stringify(req.body);
	}
	return ''
})

const app = express();

app.use(express.static('dist'))
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req, res) => {
	Person.find({})
		.then(persons => {
			res.json(persons);
		})
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
	Person.countDocuments({})
		.then(count => {
			res.send(`
				<p>phonebook has info for ${count} persons</p> 
				<p>${date}</p>
			`);
		})
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

app.listen(process.env.PORT || 3001);
