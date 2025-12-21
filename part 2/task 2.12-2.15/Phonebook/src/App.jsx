import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import Info from "./components/Info.jsx";
import Form from "./components/Form.jsx";
import Phonebook from "./components/Phonebook.jsx";
import axios from "axios";
import {create} from "./phonebookService.js";


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
		if (!persons.some(person => person.name === newName)) {
			create({
				name: newName,
				number: newNumber,
				id: String(Number(persons[persons.length - 1].id) + 1),
			}).then(person => setPersons(persons.concat([person])))
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
