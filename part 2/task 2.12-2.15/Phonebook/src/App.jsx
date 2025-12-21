import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import Info from "./components/Info.jsx";
import Form from "./components/Form.jsx";
import Phonebook from "./components/Phonebook.jsx";
import axios from "axios";
import {create, remove, update} from "./phonebookService.js";


const App = () => {
	const [persons, setPersons] = useState([])

	useEffect(() => {
		axios.get('http://localhost:3001/persons')
			.then((response) => {
				setPersons(response.data)
			})
	}, []);

	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const [search, setSearch] = useState('')

	const addNewNumberHandler = e => {
		e.preventDefault()

		const existingPerson = persons.find(person => person.name === newName)
		if (existingPerson) {
			if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
				const changePerson = {...existingPerson, number: newNumber}
				update(existingPerson.id, changePerson)
					.then(changedPerson => setPersons(persons.map(person => person.id !== changePerson.id ? person : changedPerson)))

			}
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
				id: persons.length > 0 ? String(Number(persons[persons.length - 1].id) + 1) : "1",
			}
			create(newPerson)
				.then(createdPerson => setPersons(persons.concat(createdPerson)))
			setNewName('')
			setNewNumber('')
		}

	}

	const deletePersonHandler = id => {
		const person = persons.find(p => p.id === id)

		if (window.confirm(`Delete ${person.name} ?`)) {
			remove(id)
				.then(() => {
					setPersons(persons.filter(p => p.id !== id))
				})
		}
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
			<Phonebook data={personsToShow} handler={deletePersonHandler}/>
		</div>
	)
}

export default App
