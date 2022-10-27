import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState: (JSON.parse(window.localStorage.getItem('user'))),
    reducers:{
        setUserGlobal: (state,action)=> action.payload
    }
})

export const {setUserGlobal} = userSlice.actions

export default userSlice.reducer
