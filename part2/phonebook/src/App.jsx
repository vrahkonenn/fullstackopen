import { use, useState } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      console.log(`${newName} is already added to phonebook`)
      window.alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
      return
    }

    const newPerson = {
      "name": `${newName}`, 
      "number": `${newNumber}`
    }

    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const searchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} searchChange={searchChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNameChange}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} search={search} />
    </div>
  )

}

export default App