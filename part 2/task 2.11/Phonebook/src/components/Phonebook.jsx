const Phonebook = ({data}) => {
	return (
		<>
			{data.map(person => (
				<p key={person.id}>
					{person.name} {person.number}
				</p>
			))}
		</>
	)
}
export default Phonebook
