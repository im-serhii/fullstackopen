import mongoose from "mongoose";

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://serhiididenko_db_user:${password}@cluster0.rrzl69d.mongodb.net/PhoneBook?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const personSchema = mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 3) {
	console.log('phonebook:')
	Person.find({})
		.then(persons => {
			persons.forEach(person => {
				if (person) {
					console.log(`${person.name} ${person.number}`);
				}
			})
			mongoose.connection.close();
			process.exit();
		})
} else if (process.argv.length === 5) {
	const person = new Person({
		name: name,
		number: number
	})

	person.save().then(person => {
		console.log(`added ${person.name} number ${person.number} to phonebook`)
		mongoose.connection.close()
	})
}
