import { create } from 'zustand'
import anecdoteService from './services/anecdoteService'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set, get) => ({
  anecdotes: anecdotesAtStart.map(asObject),
  filter: '',
  actions: {
    vote: async (id) => {
      const anecdoteToUpdate = get().anecdotes.find(a => a.id === id)
      const updatedAnecdote = await anecdoteService.update(id, {...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 })
      set(
      state => ({ 
        anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)
      }))

      useNotificationStore
        .getState()
        .actions
        .setNotification(`Anecdote: "${updatedAnecdote.content}" voted`)
      },

    add: async (content) => {
      const newObject = await anecdoteService.createNew(content)
      set(
      state => ({
        anecdotes: state.anecdotes.concat(newObject)
      }))

      useNotificationStore
        .getState()
        .actions
        .setNotification(`New anecdote "${newObject.content}" created`)
        
    },

    deleteAnecdote: async (id) => {
      const anecdoteToDelete = get().anecdotes.find(a => a.id === id)
      await anecdoteService.deleteAnecdote(id)
      set(
        state => ({ 
          anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
        })
      )

      useNotificationStore
        .getState()
        .actions
        .setNotification(`Anecdote "${anecdoteToDelete.content}" deleted`)
    },

    setFilter: (content) => set(() => ({ filter: content })),

    initialize: async () => { 
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes })
    )}
  },
}))

const useNotificationStore = create ((set) => ({
  notification: null,

  actions: {
    setNotification: (message) => {
      set(state => ({notification: message}))
      setTimeout(() => {
        set(state => ({notification: null}))
      }, 5000)
    }
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)

  const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  return filteredAnecdotes
}

export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
 