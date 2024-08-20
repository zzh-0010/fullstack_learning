/* 
分离功能逻辑稍微有点混乱
*/

import { createNew } from "../request"
import { useMutation, useQueryClient } from "react-query"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {

  const [notification, dispatch] = useContext(NotificationContext)

  const newAnecMutation = useMutation(createNew, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      dispatch({type: 'ERROR', payload:error.response.data.error})
    }
  })
  //console.log('OHHHH',error)
  const queryClient = useQueryClient()

  const onCreate = async(event) => {
    event.preventDefault()
    const newObject = {
      content: event.target.anecdote.value,
      votes: 0
    }
    newAnecMutation.mutate(newObject, {
      onSuccess: () => {
        dispatch({type: 'ADD', payload: newObject.content})
      }
    })
    event.target.anecdote.value = ''
    setTimeout(() => {
      dispatch({type: 'CLEAR'})
    },5000)
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
