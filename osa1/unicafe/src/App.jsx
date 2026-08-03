import { useState } from 'react'

const Statistics = (props) => {
  
  if(props.good === 0 && props.neutral === 0 && props.bad === 0)
  {
    return(
      <div>
        <h1> statistics </h1>
        <p> No feedback given </p>
      </div>
    )
  }
  return(
    <div>
      
      <h1> statistics </h1>
      <StatisticLine text='good' value={props.good} />
      <StatisticLine text='neutral' value={props.neutral} />
      <StatisticLine text='bad' value={props.bad} />
      <StatisticLine text='all' value={props.good + props.neutral + props.bad} />
      <StatisticLine text='avarage' value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
      <StatisticLine text='positive' value={props.good / (props.good + props.neutral + props.bad) * 100 + " %"} />
    </div>
  )
  
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine  = ({text, value}) => <p> {text} {value} </p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <h1> give feedback </h1>
      <Button onClick={addGood} text='good' />
      <Button onClick={addNeutral} text='neutral' />
      <Button onClick={addBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App