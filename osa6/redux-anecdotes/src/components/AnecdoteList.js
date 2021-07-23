import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notficationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  const dispatch = useDispatch()


  return(
    <div>
    {filteredAnecdotes.sort((a,b) => b.votes-a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => {dispatch(addVote(anecdote));
            dispatch(notificationChange(`You voted '${anecdote.content}'`, 10000))}}>vote</button>
        </div>
      </div>
    )}
    
    </div>
  )
}

export default AnecdoteList