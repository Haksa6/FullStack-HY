import React, { useState } from 'react'

const StatisticLine = (props) =>{
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
        
  )
}

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good " value ={props.good} />
        <StatisticLine text="neutral " value ={props.neutral} />
        <StatisticLine text="bad " value ={props.bad} />
        <StatisticLine text="all " value ={props.all} />
        <StatisticLine text="average " value ={props.average} />
        <StatisticLine text="positive " value ={props.positive} />
      </tbody>
    </table>
  )
}
const History = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
    <Statistics good = {props.good} neutral = {props.neutral} bad = {props.bad} all= {props.all}
    average  = {props.average} positive  = {props.positive}/>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = bad + neutral + good
  const average = all ? ((good * 1 + neutral * 0 + bad * -1) / all): 0;
  const positive = all ? ((good / all) * 100) + " %" : "0%";
  
  const increaseGood = () => {
    setGood(good + 1)
  }

  const increaseNeutral= () => {
    setNeutral(neutral + 1)
  }
  
  const increaseBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>
      give feedback
      </h1>
      <Button
        handleClick={increaseGood}
        text='good'
      />
      <Button
        handleClick={increaseNeutral}
        text='neutral'
      />     
      <Button
        handleClick={increaseBad}
        text='bad'
      />   
      <h1>
      statistics
      </h1> 
      <History all = {all} good = {good} neutral = {neutral} 
      bad = {bad} average = {average} positive = {positive}/>
    </div>
  )
}

export default App