import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notficationReducer'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notificationChange(`New anecdote ${content} added`)
  }

  return (
    <div>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createAnecdote, notificationChange }
)(AnecdoteForm)