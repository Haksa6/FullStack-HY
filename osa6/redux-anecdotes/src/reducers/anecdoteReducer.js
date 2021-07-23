import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n=>n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
  
}
export const addVote = (content) => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.addVote({...content, votes: content.votes +1 })
    dispatch({
      type: 'VOTE',
      data: updateAnecdote
    })
  }
}
export const createAnecdote = (content) =>{
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}
export default reducer