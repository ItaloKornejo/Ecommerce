import { current } from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsCart } from '../../store/slices/cart.slice'
import getConfig from '../../utils/getConfig'
import './styles/cartproduct.css'

const CartProduct = ({ product }) => {
  const dispatch = useDispatch()
  const currency = useSelector(state => state.currency)
  const products = useSelector(state => state.products)
  const currentCart = useSelector(state => state.cart)

  const handleMinus = (e) => {
    e.stopPropagation()
    if (currentCart?.products.filter(prod => prod.id === product.id).length && currentCart?.products.filter(prod => prod.id === product.id)[0].productsInCart.quantity > 1) {

      console.log('En PROCESO de Restar', product.id, currentCart.products.filter(prod => prod.id === product.id)[0].productsInCart.quantity);

      const URL = 'https://e-commerce-api.academlo.tech/api/v1/cart'
      const data = {
        id: product.id,
        newQuantity: (currentCart.products.filter(prod => prod.id === product.id)[0].productsInCart.quantity - 1)
      }
      axios.patch(URL, data, getConfig())
        .then(res => {
          dispatch(getAllProductsCart())
          console.log(res.data)
        })
        .catch(err => console.log(err))

    } else {
      const URL = `https://e-commerce-api.academlo.tech/api/v1/cart/${product.id}`
      axios.delete(URL, getConfig())
        .then(res => {
          dispatch(getAllProductsCart())
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }
  }


  const handlePlus = (e) => {
    e.stopPropagation()
    if (currentCart.products.filter(prod => prod.id === product.id).length) {

      console.log('En PROCESO de Restar', product.id, currentCart.products.filter(prod => prod.id === product.id)[0].productsInCart.quantity);

      const URL = 'https://e-commerce-api.academlo.tech/api/v1/cart'
      const data = {
        id: product.id,
        newQuantity: (currentCart.products.filter(prod => prod.id === product.id)[0].productsInCart.quantity + 1)
      }
      axios.patch(URL, data, getConfig())
        .then(res => {
          dispatch(getAllProductsCart())
          console.log(res.data)
        })
        .catch(err => console.log(err))

    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    const URL = `https://e-commerce-api.academlo.tech/api/v1/cart/${product.id}`
    axios.delete(URL, getConfig())
      .then(res => {
        dispatch(getAllProductsCart())
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }


  const handleCurrency = (price) => {
    return currency[0] + ((currentCart.products.filter(prod => prod.id === product.id)[0].productsInCart.quantity) * (parseFloat(currency[1]) * price)).toFixed(1)
  }
  return (
    <div className='cart__product-container'>
      <div className='cart__header'>
        <span className='cart__header-brand'>{product?.brand}</span>
        <i onClick={handleDelete} className='cart__icon-delete bx bx-trash'></i>
      </div>
      <div className='cart__product-title'>
        {product?.title}
      </div>
      <div className='cart__product-amount'>
        <i onClick={handleMinus} className='cart__product-minus bx bxs-left-arrow' ></i>
        <span className='cart__amount-current'>{(currentCart.products.filter(prod => prod.id === product.id)[0].productsInCart.quantity)}</span>
        <i onClick={handlePlus} className='cart__product-plus bx bxs-right-arrow' ></i>
      </div>
      <div className='cart__product-total'>
        <span className='cart__total-text'>Total</span>
        <span className='cart__total-current'>{handleCurrency(product?.price)}</span>
      </div>
    </div>
  )
}

export default CartProduct