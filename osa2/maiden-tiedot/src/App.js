import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'


const App = () => {
  const[ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')


  const handleFilterChange = (event) =>{
      setFilter(event.target.value)
      axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  return (
    <div>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange}/>
      <Countries countries = {countries} filter = {filter} setCountries = {setCountries}/>
    </div>
  )
}


export default App
