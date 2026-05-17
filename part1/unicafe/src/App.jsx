import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Feedback = ({ good, setGood, neutral, setNeutral, bad, setBad}) => {
  const handleClickGood = () => setGood(good+1)
  const handleClickNeutral = () => setNeutral(neutral+1)
  const handleClickBad = () => setBad(bad+1)

  return(
    <div>
      <h2>give feedback</h2>
      <div>
        <Button handleClick={handleClickGood} text="good"/>
        <Button handleClick={handleClickNeutral} text="neutral"/>
        <Button handleClick={handleClickBad} text="bad"/>
      </div>
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const avg = (good - bad)/all 
  const positive = good/all*100

  if (all == 0) {
    return(
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  } else {
      return(
        <div>
          <h2>statistics</h2>
          <table>
            <tbody>
              <StatisticLine text="good" value={good}/>
              <StatisticLine text="neutral" value={neutral}/>
              <StatisticLine text="bad" value={bad}/>
              <StatisticLine text="all" value={all}/>
              <StatisticLine text="average" value={avg}/>
              <StatisticLine text="positive" value={positive} endMarker="%"/>
            </tbody>
          </table>
        </div>
      )
  }
}

const StatisticLine = ({ text, value, endMarker = ""}) => {
  return(
    <tr>
      <td>{text}</td> 
      <td>{value}{endMarker}</td>
    </tr>
  )
}

const App = () => {
  // React app states
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  return (
    <div>
      <Feedback good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App