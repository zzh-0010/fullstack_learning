import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'init',
    reducers: {
        voteNotification(state, action) {
            return action.payload
        },
        showOver(){
            return 'init'
        }
    }
})

export const {voteNotification, showOver} = notificationSlice.actions

export const setNotification = (notification, time) => {
    return dispatch => {
        console.log(notification)
        dispatch(voteNotification(notification))
        setTimeout(() => {
            dispatch(showOver())
        }, time*1000)
    }
}

export default notificationSlice.reducer
