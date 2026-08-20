import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.HandleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.HandleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, deletePerson}) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number} 
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }

    const alreadyExists = persons.some(
    (person) => person.name === newName
    )

    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id, name) => {
  if (window.confirm(`Delete ${name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      setErrorMessage(`Deleted ${name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
  }
}

  const HandleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const HandleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <h2>add a new</h2>
      <PersonForm 
        addName={addName} newName={newName} newNumber={newNumber}
        HandleNameChange={HandleNameChange} HandleNumberChange={HandleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )

}

export default App