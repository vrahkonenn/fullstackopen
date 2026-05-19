import { use, useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personServive from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personServive.getAll().then(initialPersons => {
      setPersons(initialPersons)
      console.log("Persons fetched from server")
    }).catch(error => {
      console.log("Error: ", error);
    })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    setNewName("")
    setNewNumber("")

    const newPerson = {
      "name": `${newName}`, 
      "number": `${newNumber}`
    }

    const oldPerson = persons.find(person => person.name === newName)

    if (oldPerson) {

      if (!window.confirm(`${oldPerson.name} is already added to phonebook, replace the old number with new one?`)) return
      
      personServive
        .update(oldPerson.id, newPerson)
        .then(initialPerson => {
          setPersons(persons.map(person => person.id !== initialPerson.id ? person : initialPerson))
        })      
        .catch(error => {
          console.log("Error: ", error);
      })
    } else {
      personServive
        .create(newPerson)
        .then(initialPerson => {
          setPersons(persons.concat(initialPerson))
        })
        .catch(error => {
          console.log("Error: ", error);
        })
    }
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    console.log(personToDelete);
    
    if (!window.confirm(`Delete ${personToDelete.name} `)) return

    personServive
      .deletePerson(id)
      .catch(error => {
        console.log("Error: ", error);
      })

    setPersons(persons.filter(person => id !== person.id))
    console.log(`${personToDelete.name} deleted succesfully`)
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
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} search={search} handleDelete={handleDelete}/>
    </div>
  )

}

export default App