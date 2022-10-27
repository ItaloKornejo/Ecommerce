import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCurrencyGoblal } from '../../store/slices/currency.slice'
import SearchProducts from './SearchProducts'
import { Link } from 'react-router-dom'
import './styles/header.css'
import Cart from '../../pages/Cart'
import { getAllProductsCart, setCartGlobal } from '../../store/slices/cart.slice'
import { setUserGlobal } from '../../store/slices/user.slice'

const Header = () => {
    const cart = useSelector(state => state.cart)
    const [isLogged, setIsLogged] = useState()
    const navigate = useNavigate()
    const userData = useSelector(state => state.user)
    const currencyCurrent = useSelector(state => state.currency)
    const dispatch = useDispatch()
    const [isShowCart,setIsShowCart] = useState(false)


    useEffect(() => {
        dispatch(getAllProductsCart())
      }, [])
      

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    }, [userData])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsLogged(false)
        dispatch(setUserGlobal(null))
        dispatch(setCartGlobal(null))
        navigate(`/`)
    }

    const handleNavigationPurchase = () => {
        navigate(`/purchases`)
    }

    const handleShowCart = () => {
        if(isLogged){
            setIsShowCart(!isShowCart)
        }else{
            navigate(`/login`)
        }
        
    }
    const handleShowCounterCart  = () => {
        if(isLogged){
           return {visibility: 'visible'}
        }else{
           return {visibility: 'hidden'}
        }
        
    }

    const handleCounterCart  = () => {
        if(isLogged){
            console.log(cart?.products.map(prod => prod.productsInCart.quantity)?.reduce(function(a, b) { return a + b; }, 0));
           return cart?.products.map(prod => prod.productsInCart.quantity)?.reduce(function(a, b) { return a + b; }, 0)
        }else{
           return null
        }
        
    }

    const handleCurrency = (e) => {
        switch (e.target.id) {
            case 'EUR':
                dispatch(setCurrencyGoblal(['€', '1.01']))
                break
            case 'GBP':
                dispatch(setCurrencyGoblal(['£', '1.16']))
                break
            default:
                dispatch(setCurrencyGoblal(['$', '1']))
                break
        }

    }

console.log(cart);

    return (
        <>
        <header className='header-container'>
            <div className='header__info-banner'>
                <section className='header__info'>
                    <div className='header__info-contact'>
                        <p className='header__phone'><i className='header__phone-icon bx bx-phone' ></i> +51-01-442-1210</p>
                        <p className='header__mail'><i className='header__mail-icon bx bx-envelope' ></i> ventasonline@electro.com</p>
                        <p className='header__location'><i className='header__location-icon bx bx-location-plus' ></i> Av. Los claveles 1234</p>
                    </div>
                    <div className='header__info-data'>
                        <div className='header__currency'>
                            <div className="header__select-currency" tabIndex="1">
                                <input onChange={handleCurrency} className="header__option-currency" name="cur" type="radio" id="USD" defaultChecked />
                                <label htmlFor="USD" className="header__option-currency-label"><i className='bx bx-dollar' ></i> USD</label>
                                <input onChange={handleCurrency} className="header__option-currency" name="cur" type="radio" id="EUR" />
                                <label htmlFor="EUR" className="header__option-currency-label"><i className='bx bx-euro' ></i> EUR</label>
                                <input onChange={handleCurrency} className="header__option-currency" name="cur" type="radio" id="GBP" />
                                <label htmlFor="GBP" className="header__option-currency-label"><i className='bx bx-pound' ></i> GBP</label>
                            </div>
                        </div>
                        <div className='header__user'>
                            {
                                isLogged ? <div className="header__select-user" tabIndex="1">
                                    <input className="header__option-user" name="use" type="radio" id="optUser1" defaultChecked />
                                    <a htmlFor="optUser1" className="header__option-user-label"><i className='bx bx-user-circle'></i> {userData?.firstName}</a>
                                    <a onClick={handleNavigationPurchase} htmlFor="optUser2" className="header__option-user-label"> <i className='bx bx-notepad'></i>Purchase</a>
                                    <a onClick={handleLogout} htmlFor="optUser3" className="header__option-user-label"><i className='bx bx-log-out-circle' ></i> Log Out</a>
                                </div> : <div className='header__user-login'>
                                    <Link to='/login' className="header__user-text">
                                        <i className='bx bx-user-circle'></i> Login
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>

                </section>
            </div>
            <div className='header__main-banner'>
                <section className='header__main'>
                    <h1 className='header__title'>
                        <Link to='/' >Electro<span>.</span></Link>
                    </h1>
                    <div className='header__search'>
                        <SearchProducts />
                    </div>

                    <div className='header__btn'>
                        <div onClick={handleShowCart} className={`header__btn-cart `} >
                            <i className='header__icon-cart bx bxs-cart-alt' ></i>
                            <span style={handleShowCounterCart()} className='header__icon-cart-label'>{handleCounterCart()}</span>
                        </div>
                    </div>
                </section>
            </div>
        </header>
        {
            isLogged && cart ? <Cart isShowCart={isShowCart}/> : <></>
        }
        
        </>
    )
}

export default Header