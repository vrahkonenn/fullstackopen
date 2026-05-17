import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const voteAnecdote = () => {
    let copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  const switchSelected = () => {
    let num = selected
    while (num === selected) {
      num = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(num)
  } 

  const findIndexOfMax = (array) => {
    let maxIndex = 0
    for (let i = 1; i < array.length; i++) {
      if (array[i] > array[maxIndex]) {
        maxIndex = i
      }
    }
    return maxIndex
  } 

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <Button text="vote" handleClick={voteAnecdote}/>
        <Button text="next anecdote" handleClick={switchSelected}/>
      </div>

      <h2>Anecdote with most votes</h2>
      {anecdotes[findIndexOfMax(votes)]}
      <p>has {votes[findIndexOfMax(votes)]} votes</p>
    </div>
  )
}

export default App