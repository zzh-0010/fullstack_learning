import { createSlice } from "@reduxjs/toolkit"


const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        anecdoteFilter(state, action) {
            console.log('here',action.payload)
            return action.payload
        }
    }
})

export const {anecdoteFilter} = filterSlice.actions
export default filterSlice.reducer