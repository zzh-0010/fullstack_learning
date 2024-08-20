import { useDispatch } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"

const NewAnec = () => {

    const dispatcher = useDispatch()

    const addAnec = async (event) => {
        event.preventDefault()
        const newAnecdote = {
            content: event.target.anecdote.value,
            votes: 0
        }
        dispatcher(addNewAnecdote(newAnecdote))
    }

    return (
    <div>
      <h2>create new</h2>
      <div>
      <form onSubmit={addAnec}>
            <input
                name="anecdote"
            />
        <button type='submit'>create</button>
      </form> 
      </div>
    </div>
    )
}

export default NewAnec