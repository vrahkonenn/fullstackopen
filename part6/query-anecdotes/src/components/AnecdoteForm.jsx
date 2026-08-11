import { useAnecdotes } from "../hooks/useAnecdotes"

const AnecdoteForm = () => {
  const { addAnecdote: createAnecdote } = useAnecdotes()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    createAnecdote(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm