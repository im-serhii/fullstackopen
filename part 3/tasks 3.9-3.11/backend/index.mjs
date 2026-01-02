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
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).send('Not Found').close()
			}
		})
		.catch(err => {
			res.status(404).json({error: `No such person ${err.message}`})
		})
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

	if (!person.name) {
		res.status(400).json({ error: 'a name is required' });
		return
	} else if (!person.number) {
		res.status(400).json({ error: 'a number is required' });
		return
	}

	const newPerson = new Person({
		name: person.name,
		number: person.number,
	})

	newPerson.save()
		.then(person => {
				res.status(201).json(person)
		})
	.catch(err => {
		res.status(404).json({ error: `can't add ${err.message}`})
	})
})

app.listen(process.env.PORT || 3001);
