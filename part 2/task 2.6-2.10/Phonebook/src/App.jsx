import { useState } from 'react'
import Filter from "./components/Filter.jsx";
import Info from "./components/Info.jsx";
import Form from "./components/Form.jsx";
import Phonebook from "./components/Phonebook.jsx";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	])

	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const [search, setSearch] = useState('')

	const addNewNumberHandler = e => {
		e.preventDefault()
		if (!persons.some(person => person.name === newName)) {
			setPersons(
				persons.concat({
					name: newName,
					number: newNumber,
					id: persons[persons.length - 1].id + 1,
				})
			)
			setNewName('')
			setNewNumber('')
			return
		}
		alert(`${newName} is already added to the phonebook`)
		setNewName('')
		setNewNumber('')
	}

	const personsToShow = persons.filter(person =>
		person.name.toLowerCase().includes(search.toLowerCase())
	)

	const inputNewNameHandler = e => setNewName(e.target.value)
	const inputNewNumberHandler = e => setNewNumber(e.target.value)
	const searchHandler = e => setSearch(e.target.value)

	return (
		<div>
			<Info text='Phonebook' />
			<Filter value={search} searchHandler={searchHandler} />
			<Info text='add a new' />
			<Form onSubmit={addNewNumberHandler}
			      nameValue={newName}
			      nameOnChange={inputNewNameHandler}
			      numberValue={newNumber}
			      numberOnChange={inputNewNumberHandler}
			/>
			<Info text='Numbers' />
			<Phonebook data={personsToShow} />
		</div>
	)
}

export default App
