import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const productsSlice = createSlice({
    name:'products',
    initialState: null,
    reducers:{
        setProductsGoblal: (state,action)=> action.payload
    }
})

export const {setProductsGoblal} = productsSlice.actions

export default productsSlice.reducer

export const getProducts = () => (dispatch) => {
    const URL= `https://e-commerce-api.academlo.tech/api/v1/products`
    return axios.get(URL)
        .then(res => dispatch(setProductsGoblal(res.data.data.products)))
        .catch(err => console.log(err))
}

