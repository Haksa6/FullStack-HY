import React from 'react'


const CountryMap =  ({country}) => {
  return(
    country.map(country=>(
      <div key = {country.numericCode}>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>Spoken languages</h2>
        <ul>
          {country.languages.map(language=>(
            <li>{language.name}</li>
          ))}
        </ul>
        <img src = {country.flag} alt = "flag" width = "200" height = "150"/>
      </div>
  ))
  )
}


export default CountryMap