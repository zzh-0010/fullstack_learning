import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
    {props.text}
  </button>
  )
}

const StatisticsLine = (props) => {
  return (
    <>
    <tr>
    <td>{props.text}</td>
    <td>{props.value}{props.addchar}</td>
    </tr>
    </>
  )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  if (props.good == 0 && props.neutral == 0 && props.bad == 0){
    return (
      <div>
        <p>No feedback given!</p>
      </div>
    )
  }
  else{
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine text = "good" value={props.good} addchar=""/>
            <StatisticsLine text = "neutral" value={props.neutral} addchar=""/>
            <StatisticsLine text = "bad" value={props.bad} addchar=""/>
            <StatisticsLine text = "all" value={total} addchar=""/>
            <StatisticsLine text = "average" value={(props.good - props.bad) / total} addchar=""/>
            <StatisticsLine text = "positive" value={props.good * 100 / total} addchar="%"/>
          </tbody>
        </table>
      </div>
    )
  }
}

const Header = () => {
  return (
    <div>
      <h1>Give Feedback</h1>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header />
      <Button onClick={goodClick} text = "good"/>
      <Button onClick={neutralClick} text = "neutral"/>
      <Button onClick={badClick} text = "bad"/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
