import React from 'react'

const Course = ({course}) => {
  return(
    <div>
      <Header course = {course.name}/> 
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

const Header = ({course}) => 
  <h1>
    {course}
  </h1>

const Total = ({parts}) => {
  const result = parts.map(parts => parts.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const allExercises = result.reduce(reducer)
  return(
    <b>
      total of {allExercises} exercises
    </b>
  )
}
  

const Content = ({parts}) => {
  return (
      <div>
          {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}  
      </div>
  )
}

const Part = ({name, exercises}) =>
  <p>
    {name} {exercises}
  </p>

  export default Course