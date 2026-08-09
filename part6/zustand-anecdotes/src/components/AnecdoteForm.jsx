import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.content.value
    add(content)
    e.target.reset()
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content"/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm