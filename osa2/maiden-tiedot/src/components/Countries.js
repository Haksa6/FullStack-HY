import React, {useState} from 'react'
import SingleCountry from './SingleCountry'

const Countries = ({countries, filter, setCountries}) => {
  const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if(filtered.length > 10){
    return(
    <div>Too many matches, specify another filter</div>
    )
  }

  if(filtered.length === 1){
    return(
      <SingleCountry country = {filtered}/>
    )
  }

  return(
    filtered.map(country=>(
      <div key = {country.name}>
        {country.name} <button onClick = {()=>setCountries([country])}>
        show
        </button>
      </div>
      ))
  )
}

export default Countries