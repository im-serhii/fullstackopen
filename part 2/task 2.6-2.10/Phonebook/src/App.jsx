import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '+35840544544356' },
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const addNewNumberHandler = e => {
		e.preventDefault()
		if (!persons.some(person => person.name === newName)) {
			setPersons(persons.concat({ name: newName, number: newNumber }))
			setNewName('')
			setNewNumber('')
			return
		}
		alert(`${newName} is already added to the phonebook`)
		setNewName('')
		setNewNumber('')
	}

	const inputNewNameHandler = e => setNewName(e.target.value)
	const inputNewNumberHandler = e => setNewNumber(e.target.value)

	return (
		<div>
			<h2>Phonebook</h2>
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
			{persons.map(person => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	)
}

export default App
