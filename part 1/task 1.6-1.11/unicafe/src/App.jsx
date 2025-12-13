import { useState } from 'react'
import Info from './components/info'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + neutral + bad
  let average = all === 0 ? 0 : (good - bad) / all
  let positive = all === 0 ? 0 : (good / all) * 100

  const clickHandler = (setState) => () => {
    setState(prev => prev + 1)
  }

  return (
    <div>
      <Info title='give feedback' />
      <Button eventHandler={clickHandler(setGood)} text="good"/>
      <Button eventHandler={clickHandler(setNeutral)} text="neutral" />
      <Button eventHandler={clickHandler(setBad)} text="bad" />
      <Info title='statistics' />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        all={all} 
        average={average} 
        positive={positive} 
      />
    </div>
  )
}

export default App