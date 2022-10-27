import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:'search',
    initialState: ['all'],
    reducers:{
        setSearchGlobal: (state,action)=> action.payload
    }
})

export const {setSearchGlobal} = searchSlice.actions

export default searchSlice.reducer
