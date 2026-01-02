import mongoose from "mongoose";

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const personSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		trim: true
	},
	number: {
		type: String,
		required: true,
		minlength: 8,
		trim: true,
		validate: {
			validator: function(v) {
				return /^\d{2,3}-\d+$/.test(v);
			},
			message: props => `${props.value} is not a valid number`
		}
	}
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

export default mongoose.model("Person", personSchema)
