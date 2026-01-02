import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import Info from "./components/Info.jsx";
import Form from "./components/Form.jsx";
import Phonebook from "./components/Phonebook.jsx";
import axios from "axios";
import {create, remove, update} from "./phonebookService.js";
import Notification from "./components/Notification/Notification.jsx";


const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')
	const [notificationStatus, setNotificationStatus] = useState(null)
	const [notificationData, setNotificationData] = useState(null)

	useEffect(() => {
		axios.get('api/persons')
			.then((response) => {
				setPersons(response.data)
			})
	}, []);

	const notificationHandler = (status, data) => {
		setNotificationStatus(status)
		setNotificationData(data)
		setTimeout(() => {
			setNotificationStatus(null)
			setNotificationData(null)
		}, 2500)
	}

	const addNewNumberHandler = e => {
		e.preventDefault()

		const existingPerson = persons.find(person => person.name.trim().toLowerCase() === newName.trim().toLowerCase())
		if (existingPerson) {
			if(window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
				const changePerson = {...existingPerson, number: newNumber}
				update(changePerson.id, changePerson)
					.then(changedPerson => {
						setPersons(persons.map(person => person.id !== changePerson.id ? person : changedPerson))
						notificationHandler('update', changePerson.name )
						setNewName('')
						setNewNumber('')
					})
					.catch(error => {
						console.log(error)
						if (error.response.status === 404) {
							setPersons(persons.filter(p => p.id !== changePerson.id))
							notificationHandler('error', `Information of ${changePerson.name} has already been removed from server` )
						} else {
							notificationHandler('error', error.response.data.error)
						}
						setNewName('')
						setNewNumber('')
					})
			}
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
			}
			create(newPerson)
				.then(createdPerson => {
					setPersons(persons.concat(createdPerson))
					notificationHandler('success', newPerson.name)
				})
				.catch(error => {
					notificationHandler('error', error.response.data.error)
				})

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
					notificationHandler('delete', person.name)
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
			<Notification status={notificationStatus} data={notificationData}/>
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
