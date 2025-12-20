import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
	const [newName, setNewName] = useState('')

	const addNewNumberHandler = e => {
		e.preventDefault()
		setPersons(persons.concat({ name: newName }))
		setNewName('')
	}

	const inputNewNameHandler = e => setNewName(e.target.value)

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
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(person => (
				<p key={person.name}>{person.name}</p>
			))}
		</div>
	)
}

export default App
