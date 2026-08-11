import { getAnecdotes, voteAnecdote, createAnecdote } from '../requests'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['anecdotes']})}
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ['anecdotes']})}
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    voteAnecdote: (anecdote) => voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes +1 }),
  }
}