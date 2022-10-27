import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartProduct from '../components/Cart/CartProduct';
import { getAllProductsCart, setCartGlobal } from '../store/slices/cart.slice';
import getConfig from '../utils/getConfig';
import './styles/cart.css'

const Cart = ({ isShowCart }) => {
  const currency = useSelector(state => state.currency)
  const cart = useSelector(state => state.cart)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getAllProductsCart())
  // }, [])
  
 
  const handleShowCart = () => {
    if (isShowCart) {
      return 'cart-show'
    }
    return ''
  }

   
  const handlePurchase = () => {
    const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/purchases'
      const data = {
        "street": "Green St. 1456",
        "colony": "Southwest",
        "zipCode": 12345,
        "city": "USA",
        "references": "Some references"
      }
      axios.post(URL, data, getConfig())
        .then(res => {
          dispatch(setCartGlobal(null))
          dispatch(getAllProductsCart())
          console.log(res.data)
        })
        .catch(err => console.log(err))

  }

  
  

  const getTotal = () => {
    const total=(cart?.products.map(prod => parseInt(prod.price)*prod.productsInCart.quantity))?.reduce(function(a, b) { return a + b; }, 0)
    return  currency[0]+(total*currency[1]).toFixed(1)
  }

  return (
    <article className={`cart-container ${handleShowCart()}`}>
      <div className="content_cart-body">
        {
          cart?.products.map(product => (<CartProduct key={product.id} product={product}/>

          ))
        }
      </div>
      <div className="content_cart-total">
        <h3>Total:<span id="total">{getTotal()}</span></h3>
        <div onClick={handlePurchase} className="payNow"><p>Pagar ahora</p><i className='bx bx-money-withdraw' ></i></div>
      </div>

    </article>
  )
}
export default Cart