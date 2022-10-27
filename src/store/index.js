import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products.slice";
import user from "./slices/user.slice";
import search from "./slices/search.slice";
import currency from "./slices/currency.slice";
import cart from "./slices/cart.slice";



export default configureStore({
    reducer:{
        products,user,search,currency,cart
    }
})