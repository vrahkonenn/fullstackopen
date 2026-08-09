import { useAnecdoteActions, useAnecdotes } from '../store'

const AnecdoteList = () => {
  const { vote, deleteAnecdote } = useAnecdoteActions()
  const anecdotes = useAnecdotes()

  const onDelete = (anecdote) => {
    if (window.confirm(`Delete anecdote: "${anecdote.content}"?`)) {
      deleteAnecdote(anecdote.id)
    }
  }

  return (
    <>
      {anecdotes
        .toSorted((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>

            <div>
              has {anecdote.votes}{' '}
              <button onClick={() => vote(anecdote.id)}>
                vote
              </button>

              {anecdote.votes === 0 && (
                <button onClick={() => onDelete(anecdote)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList