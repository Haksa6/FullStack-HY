import React, {useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN_YEAR } from '../queries'
import Select from 'react-select'

const Authors = ({show, setError}) => {
  const result = useQuery(ALL_AUTHORS)
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBornYearTo] = useState('')

  const [editAuthor, result2] = useMutation(EDIT_BORN_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })

  useEffect(() => {
    if (result2.data && result2.data.editAuthor === null) {
      setError('author not found')
    }
  }, [result2.data])  // eslint-disable-line 

  if (!show) {
    return null
  }
  if(result.loading){
    return <div>loading...</div>
  } 
  const authors = result.data.allAuthors

  const submit = async(event) => {
    event.preventDefault()
    const name = selectedOption.value
    editAuthor({ variables: { name, setBornTo: parseInt(born) }})
    setSelectedOption('')
    setBornYearTo('')
  }

  const options = []
  for (let i = 0; i<authors.length; i++){
    options.push({value: authors[i].name, label: authors[i].name})
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
          value={selectedOption}
          options={options}
          onChange={setSelectedOption}
          />
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => setBornYearTo(target.value)}/>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors