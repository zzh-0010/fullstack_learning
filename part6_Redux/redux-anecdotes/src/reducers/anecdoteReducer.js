import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    voteAnecdotes(state, action) {
      console.log("ACTION", action)
      console.log(state)
      const id = action.payload
      const anecToChange = state.find(a => a.id === id)
      const changedAnec = {
        ...anecToChange,
        votes: anecToChange.votes + 1
      }
      return state.map(a => a.id === id ? changedAnec : a)
    },
    sortAnecdotes(state) {
      return state.toSorted((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    }
  }
})

export const {voteAnecdotes, sortAnecdotes, setAnecdotes, appendAnecdote} = anecdoteSlice.actions

export const initializeSate = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = object => {
  return async dispatch => {
    const newAnec = await anecdotesService.createNew(object)
    dispatch(appendAnecdote(newAnec))
  }
}

export default anecdoteSlice.reducer