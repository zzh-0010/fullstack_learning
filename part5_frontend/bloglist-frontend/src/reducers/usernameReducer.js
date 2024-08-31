import { createSlice } from '@reduxjs/toolkit'

const usernameSlice = createSlice({
  name: 'username',
  initialState: '',
  reducers: {
    setUsername(state, action){
      return action.payload
    }
  }
})

export const { setUsername } = usernameSlice.actions

export default usernameSlice.reducer