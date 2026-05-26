const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_URI

console.log(`Connecting to ${connectionString}`)

mongoose.set('strictQuery', false)
mongoose.connect(connectionString, { family: 4 })
  .then(console.log('connected to MongoDB'))
  .catch((err) => console.log('error connecting to MongoDB:',err.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: 'Number must be format "(2-3 numbers)-(numbers)"'
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

module.exports = mongoose.model('Person', personSchema)