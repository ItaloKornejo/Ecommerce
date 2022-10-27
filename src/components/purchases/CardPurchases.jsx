import React from 'react'
import './styles/cardpurchases.css'

const CardPurchases = ({ purchase }) => {

    const date = new Date(purchase.createdAt);

    return (
        <div className='purchase-container'>
            <div className='purchase__title'>
                <span className='purchase__date'>{date.toLocaleString('eng', { month: 'long' })+' '+date.toDateString().slice(8)}</span>
                <span className='purchase__time'>{date.toLocaleTimeString()}</span>
            </div>
            <div className='purchase__products-container'>

                {
                    purchase?.cart.products.map(prod => (
                        <div className='purchase__product' key={prod.id}>
                            <span className='purchase__product-title'>{prod.title}</span>
                            <div className='purchase__product-amount'>
                                <span className='purchase__product-quantity'>{prod.productsInCart.quantity}</span>
                                <span className='purchase__product-price'>$ {prod.price}</span>
                            </div>

                        </div>))
                }

            </div>

        </div>
    )
}

export default CardPurchases