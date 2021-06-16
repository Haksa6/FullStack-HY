import React from 'react'

const Persons = ({persons, filter, handleRemovePerson}) => {
  return(
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>(
      <div key = {person.name}>
      {person.name} {person.number}<button onClick={ () =>handleRemovePerson(person.name, person.id)}>delete</button>                   
      </div>
      ))
  )
}

export default Persons