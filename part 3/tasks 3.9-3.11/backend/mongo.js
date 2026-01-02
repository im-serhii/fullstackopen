import mongoose from 'mongoose'

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log('connecting to db')
mongoose.connect(url, { family: 4 })
  .then(() => console.log('connected to db'))
  .catch(err => console.log(`connection problem ${err.message}`))

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Person', personSchema)
