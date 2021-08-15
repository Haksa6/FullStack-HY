import React, { useState, useEffect }  from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({show}) => {
  const result = useQuery(ALL_BOOKS)
  const [currentGenre, setCurrentGenre] = useState('')
  const [allGenres, setAllGenres] = useState('')
  const [genreBooks, setGenreBooks] = useState([])
  
  


  useEffect(() => {
    if(result.data){
      const books = result.data.allBooks
      books.forEach(element => {
        if(element.allGenres){
          element.allGenres.forEach((genre) =>{
            allGenres[genre] = genre
          })
        }
      });
      setAllGenres(['all genres'])
      setGenreBooks(books)
      setCurrentGenre('all genres')
    }
  }, [result, allGenres])

 /* useEffect(() => {
    if(currentGenre !== 'all genres'){
      setGenreBooks(books.filter((book) => book.allGenres.includes(currentGenre)))
    }
  }, [currentGenre, books])*/

  if (!show) {
    return null
  }


  return (
    <div>
      <div>
      <h2>books</h2>
      <p>
        in genre <b>{currentGenre}</b>
      </p>
      
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {genreBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      <div>
      {allGenres.map((genre) => (
        <button onClick={setCurrentGenre(genre)} key={genre}>{genre}</button>
      ))}
      </div>
    </div>
    
  )
}

export default Books