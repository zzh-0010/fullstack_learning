import { useSelector, useDispatch } from "react-redux"
import { voteAnecdotes, sortAnecdotes } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import Notification from './Notification'
import Filter from "./Filter"


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdotes(id))
        const anecToShow = anecdotes.find(a => a.id === id)
        dispatch(setNotification(`Vote ${anecToShow.content}`, 5))
        sortAnec()
    }
    
    const sortAnec = () => {
        dispatch(sortAnecdotes())
    }

    return (
        <div>
        <Filter />
        <Notification />
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList