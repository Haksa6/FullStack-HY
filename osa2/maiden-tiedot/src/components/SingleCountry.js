import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryMap from './CountryMap'

const SingleCountry = ({country}) => {
  const [weather, setWeather ] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.map(country=>(country.capital))}`)
      .then(response => {
        setWeather([response.data.current])
      })
  }, [api_key])
  
  if (weather.length > 0) {
    return (
        <div>
        <CountryMap country = {country}/>
        <h3>Weather in {country.map(country=>(country.capital))}</h3>
        <p><b>temperature:</b> {weather[0].temperature}° Celcius</p>
        <img src={weather[0].weather_icons} alt="weather"></img>
        <p><b>wind:</b>{weather[0].wind_speed} mph direction {weather[0].wind_dir}</p>
        </div>
    )
  }

  return(
    <CountryMap country = {country}/>
  )
}


export default SingleCountry