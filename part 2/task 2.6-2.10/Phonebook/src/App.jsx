import { useState } from 'react'

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
			<h2>Phonebook</h2>
			<div>
				filter shown with{' '}
				<input
					onChange={searchHandler}
					value={search}
					type='text'
				/>
			</div>
			<h1>add a new</h1>
			<form onSubmit={addNewNumberHandler}>
				<div>
					name:{' '}
					<input
						onChange={inputNewNameHandler}
						value={newName}
					/>
				</div>
				<div>
					number:{' '}
					<input
						onChange={inputNewNumberHandler}
						value={newNumber}
					/>
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{personsToShow.map(person => (
				<p key={person.id}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	)
}

export default App
