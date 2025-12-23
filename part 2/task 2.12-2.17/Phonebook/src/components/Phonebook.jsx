const Phonebook = ({data, handler}) => {
	return (
		<>
			{data.map(person => (
				<p key={person.id}>
					{person.name} {person.number} <button onClick={() => handler(person.id)}>delete</button>
				</p>
			))}
		</>
	)
}
export default Phonebook
