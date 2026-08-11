import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {

  const { anecdotes, isPending, isError, voteAnecdote } = useAnecdotes()
  
  if (isPending) {
    return(
      <div>
        <p>loading data...</p>
      </div>
    )
  }

  if (isError) {
    return(
      <div>
        <p>anecdote service not available due problems in server</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App