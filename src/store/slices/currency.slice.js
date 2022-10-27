import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const currencySlice = createSlice({
    name:'currency',
    initialState: ['$','1'],
    reducers:{
        setCurrencyGoblal: (state,action)=> action.payload
    }
})

export const {setCurrencyGoblal} = currencySlice.actions

export default currencySlice.reducer


