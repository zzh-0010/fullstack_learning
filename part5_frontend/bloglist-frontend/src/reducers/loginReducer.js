import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action){
      return action.payload
    }
  }
})

export const { setUser } = loginSlice.actions


export default loginSlice.reducer


