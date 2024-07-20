import { useState } from 'react'

const Button = (props) => {
    return (
        <button onClick={props.click}>{props.text}</button>
    )
}

const Header = (props) => {
    return (
        <div>
        <h1>
        {props.text}
        </h1>
        </div>
    )
}

const VotesDisplay = (props) => {
    if (props.vcounts == 0 || props.vcounts == 1) {
        return(
            <div>
        has {props.vcounts} vote
        </div>
        )
    }
    else{
        return (
            <div>
            has {props.vcounts} votes
            </div>
        )
    }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Uint16Array(7))

  const nextanecdote = () => {
    const ranNum = Math.floor(Math.random()*7)
    console.log("The current ranNum is: ", ranNum)
    setSelected(ranNum)
  }
  const newVote = [...votes]
    const vote = () => {
    newVote[selected] += 1
    setVote(newVote)
  }
  let maxIndex = newVote.reduce((maxIdx, currentValue, currentIndex, arr) => 
    currentValue > arr[maxIdx] ? currentIndex : maxIdx, 0)
    console.log("max is: ", maxIndex)

  return (
    <div>
        <Header text="Anecdote of the day"/>
      {anecdotes[selected]}
      <VotesDisplay vcounts={newVote[selected]}/>
      <Button click={vote} text="vote"/>
      <Button click={nextanecdote} text="next anecdote"/>
      <Header text="Anecdote with most votes"/>
      {anecdotes[maxIndex]}
      <VotesDisplay vcounts={newVote[maxIndex]}/>
    </div>
  )
}

export default App