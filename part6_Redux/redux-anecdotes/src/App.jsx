import NewAnec from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {initializeSate} from './reducers/anecdoteReducer'



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSate())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
    <AnecdoteList />
    <NewAnec />
    </div>
  )
}

export default App