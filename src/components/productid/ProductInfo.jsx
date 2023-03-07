import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllProductsCart } from '../../store/slices/cart.slice'
import getConfig from '../../utils/getConfig'
import './styles/productinfo.css'

const ProductInfo = ({ product }) => {
    const user = useSelector(state => state.user)
    const currentCart = useSelector(state => state.cart)
    const currency = useSelector(state => state.currency)
    const [counter,setCounter] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleMinus = () =>{
        if(counter>1){
            setCounter(counter-1)
        }
    }

    const handlePlus = () => {
        setCounter(counter+1)
    }
  
    const handleAddCart = (e) => {
        e.stopPropagation()
        if(user){
            if (currentCart?.products.filter(prod => prod.id === product.id).length) {
    
                console.log('En PROCESO de AUMENTAR', product.id, currentCart.products.filter(prod => prod.id === product.id)[0].productsInCart.quantity);
    
                const URL = 'https://e-commerce-api.academlo.tech/api/v1/cart'
                const data = {
                    id: product.id,
                    newQuantity: (currentCart.products.filter(prod => prod.id === product.id)[0].productsInCart.quantity + counter)
                }
                axios.patch(URL, data, getConfig())
                    .then(res => {
                        dispatch(getAllProductsCart())
                        console.log(res.data)})
                    .catch(err => console.log(err))
    
            } else {
                const URL = 'https://e-commerce-api.academlo.tech/api/v1/cart'
                const data = {
                    id: product.id,
                    quantity: 1
                }
                axios.post(URL, data, getConfig())
                    .then(res =>{
                        dispatch(getAllProductsCart())
                        console.log(res.data)})
                    .catch(err => console.log(err))
            }
        }else{
            navigate(`/login`)
        }
    }

    const handleCurrency = () =>{

        return currency[0]+' '+(currency[1]*product?.price).toFixed(1)
    }

    return (
        <article className='product-info'>
            <h2 className='product-info__title'>{product?.title}</h2>
            <p className='product-info__description'>{product?.description}</p>
            <footer className='product-info__footer'>
                <div className='product-info__price-container'>
                    <h3 className='product-info__price-label'>Price</h3>
                    <span className='product-info__price-number'>{handleCurrency()}</span>
                </div>
                <div className='product-info__quantity-container'>
                    <h3 className='product-info__quantity-label'>Quantity</h3>
                    <div className='counter'>
                        <div onClick={handleMinus} className='counter__minus'>-</div>
                        <div className='counter__number'>{counter}</div>
                        <div onClick={handlePlus} className='counter__plus'>+</div>
                    </div>
                </div>
                <button onClick={handleAddCart} className='product-info__btn'>Add to Cart <i className='bx bx-cart'></i></button>


            </footer>

        </article>
    )
}

export default ProductInfo