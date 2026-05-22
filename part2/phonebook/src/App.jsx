import { use, useState, useEffect } from 'react'

// Komponentit
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

// Servicet
import personServive from './services/persons'

const App = () => {

  // Sovelluksen tilat
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState('')
  const [errorNotification, setErrorNorification] = useState('')

  useEffect(() => {
    fetchPersons()
  }, [])

  const fetchPersons = () => {
    personServive.getAll().then(initialPersons => {
      setPersons(initialPersons)
      console.log("Persons fetched from server")
    }).catch(error => {
      console.log("Error: ", error);
    })
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    if (newName === "" || newNumber === "") return
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
          notificationSetter(`Updated ${newPerson.name}`)
        })      
        .catch(error => {
          console.log("Error: ", error)
          notificationSetter(`Error with updating ${newPerson.name}`, true)
          fetchPersons()
      })
    } else {
      personServive
        .create(newPerson)
        .then(initialPerson => {
          setPersons(persons.concat(initialPerson))
          notificationSetter(`Added ${newPerson.name}`)
        })
        .catch(error => {
          console.log("Error: ", error);
          notificationSetter(`Error with adding ${newPerson.name}`, true)
        })
    }
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    console.log(personToDelete);
    
    if (!window.confirm(`Delete ${personToDelete.name} `)) return

    personServive
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => id !== person.id))
        notificationSetter(`Deleted ${personToDelete.name}`)
        console.log(`${personToDelete.name} deleted succesfully`)
      })
      .catch(error => {
        console.log("Error: ", error);
        notificationSetter(`${personToDelete.name} has already been deleted from the server`, true)
        fetchPersons()
      })
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

  const notificationSetter = (message, error = false) => {
    // Jos error on false, renderöidään normaali notification, muutoin error viesti
    if (!error) {
      setNotification(message)
      setTimeout(() => {
        setNotification(null)     
      }, 5000)
    } 
    else {
      setErrorNorification(message)
      setTimeout(() => {
        setErrorNorification(null)
      },5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} errorNotification={errorNotification}/>
      <Filter search={search} searchChange={searchChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} search={search} handleDelete={handleDelete}/>
    </div>
  )

}

export default App