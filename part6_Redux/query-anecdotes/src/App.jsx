import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient,} from 'react-query'
import { getAnecdotes, changeAnecdote } from './request'
import NotificationContext from './NotificationContext'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type){
    case 'VOTE':
      return `Voted '${action.payload}'`
    case 'CLEAR':
      return ''
    case 'ADD':
      return `Added '${action.payload}'`
    case 'ERROR':
      return action.payload
  }
}

const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const queryClient = useQueryClient()

  const newAnecMutation = useMutation(changeAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    const newAnecdote = {...anecdote, votes: anecdote.votes+1}
    newAnecMutation.mutate(newAnecdote)
    notificationDispatch({type: 'VOTE', payload: anecdote.content})
    setTimeout(() => {
      notificationDispatch({type: 'CLEAR'})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  console.log(result)

  if(result.isLoading){
    return <div>Loading data...</div>
  }else if(result.isError){
    return <div>data not available due to server error, bitch!</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
