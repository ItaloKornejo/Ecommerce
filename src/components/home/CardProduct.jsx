import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllProductsCart } from '../../store/slices/cart.slice'
import getConfig from '../../utils/getConfig'
import getRandomInt from '../../utils/getDiscount'
import './styles/cardproduct.css'

const CardProduct = ({ product }) => {
    const user = useSelector(state => state.user)
    const currentCart = useSelector(state => state.cart)
    const currency = useSelector(state => state.currency)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleNavigation = () => {
        navigate(`/product/${product.id}`)
    }

    const handleAddCart = (e) => {
        e.stopPropagation()
        if (user) {
            if (currentCart?.products.filter(prod => prod.id === product.id).length) {

                console.log('En PROCESO de AUMENTAR', product.id, currentCart.products.filter(prod => prod.id === product.id)[0].productsInCart.quantity);

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

            } else {
                const URL = 'https://e-commerce-api.academlo.tech/api/v1/cart'
                const data = {
                    id: product.id,
                    quantity: 1
                }
                axios.post(URL, data, getConfig())
                    .then(res => {
                        dispatch(getAllProductsCart())
                        console.log(res.data)
                    })
                    .catch(err => console.log(err))
            }
        }else{
            navigate(`/login`)
        }
    }


    const handleCurrency = (price) => {
        return currency[0] + (parseFloat(currency[1]) * price).toFixed(1)
    }


    const handleDiscount = (price) => {
        return currency[0] + Math.floor((parseFloat(currency[1]) * price).toFixed(1) * (0.95))
    }

    return (
        <article onClick={handleNavigation} className='product__container'>
            <header className='product__header'>
                <img className='product__header-img' src={product.productImgs[0]} alt='' />
            </header>
            <div className='product__body'>
                <h4 className='product__title'>{product.title}</h4>
                <div className='product__price-container'>
                    <span className='product__price-label'>{handleDiscount(product.price)}</span>
                    <span className='product__discount-label'>{handleCurrency(product.price)}</span>
                </div>
                <div className='product__rating'>
                    <i className='bx bxs-star' ></i>
                    <i className='bx bxs-star' ></i>
                    <i className='bx bxs-star' ></i>
                    <i className='bx bxs-star' ></i>
                </div>
                <div className='product__btn-container'>
                    {/* <button onClick={handleAddCart} className='product__btn-like'>
                        <i className='product__icon-like bx bx-heart' ></i>
                    </button> */}
                    <button onClick={handleAddCart} className='product__btn-cart'>
                        <span className='product__cart-text'>Add to cart</span>
                        <i className='product__icon-cart bx bx-cart-alt'></i>
                    </button>
                </div>
            </div>

        </article>
    )
}

export default CardProduct