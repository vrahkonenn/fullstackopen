const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as an argument!');
    process.exit(1)   
}

if (process.argv.length > 5 || process.argv.length === 4) {
    console.log('5 or 3 arguments allowed: \nnode mongo.js password name number\nor\nnode mongo.js password');
    process.exit(1)   
}

const connectionString = `mongodb+srv://user:${process.argv[2]}@cluster0.7hdpo3n.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(connectionString, { family: 4 })
const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })
const Person = new mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    Person.find({}).then(result => {
        console.log('Phonebook:');
        result.forEach(p => {
            console.log(p.name, p.number);
        });
        mongoose.connection.close()
    })
}

if (process.argv.length == 5) {
    // Lisää käyttäjä

    const person = new Person ({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}

