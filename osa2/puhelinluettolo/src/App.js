import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response=> {
        setPersons(response)
      })
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
    }
    if(persons.filter(name => name.name === noteObject.name).length > 0){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const deletePerson = persons.find(person=>person.name === newName)
        personService
          .update(deletePerson.id, noteObject)
          .then(updatePerson=> {
            setPersons(persons.map(person=>(person.name === newName ? updatePerson : person)))
          })
          .catch(error=> {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
          })
          setPersons(persons.concat(noteObject))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`Updated ${newName}`)
          setTimeout(()=>{
            setErrorMessage(null)
          }, 5000)
      }
    }else{
      personService
      .create(noteObject)
        .then(returnedName => {
        setPersons(persons.concat(returnedName))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Added ${newName}`)
    })
      .catch(error =>{
        setErrorMessage(`Failed to add ${newName}`)
      })
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
    }
    
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) =>{
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const handleRemovePerson = (name, id) =>{
    if(window.confirm(`Delete ${name} ?`)){
        personService
        .remove(id)
          .then(() =>{
            setPersons(persons.filter(person => person.id !== id))
            setNewName('')
            setNewNumber('')
            setErrorMessage(`Deleted ${name}`)
          })
          .catch(error => {
            setPersons(persons.filter(person=> person.name !== name))
            setErrorMessage(`Information of ${name} has already been removed from server`)
          })
            setTimeout(() =>{
              setErrorMessage(null)
            }, 5000)
      }
}


  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message = {errorMessage}/>
        <Filter filter = {filter} handleFilterChange = {handleFilterChange}/>
      <h3>add a new</h3>
        <PersonForm addName = {addName} newName = {newName} handleNameChange = {handleNameChange}
        newNumber = {newNumber} handleNumberChange =  {handleNumberChange}/>
      <h3>Numbers</h3>
        <Persons persons = {persons} filter = {filter} handleRemovePerson = {handleRemovePerson} />
    </div>
  )

}

export default App