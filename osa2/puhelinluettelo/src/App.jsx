import { useState } from 'react'

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
const Persons = ({persons}) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <h2>add a new</h2>
      <PersonForm 
        addName={addName} newName={newName} newNumber={newNumber}
        HandleNameChange={HandleNameChange} HandleNumberChange={HandleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App