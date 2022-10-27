import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardPurchases from '../components/purchases/CardPurchases'
import Footer from '../components/shared/Footer'
import getConfig from '../utils/getConfig'
import './styles/purchases.css'

const Purchases = () => {
  const [purchases,setPurchases]= useState()
  const navigate = useNavigate()

  useEffect(()=>{
    const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/purchases`
    axios.get(URL,getConfig())
    .then(res => setPurchases(res.data.data.purchases))
    .catch(err => console.log(err))
  },[])

  const handleHome = () => {
    navigate(`/`)
}
  console.log(purchases);
  return (
    <div className='purchases-container'>
      <ul className='purchases__nav'>
                <li onClick={handleHome} style={{cursor: 'pointer'}}>Home</li>
                <li><i style={{color: 'var(--color--3)'}} className='bx bxs-chevron-right-circle' ></i></li>
                <li style={{fontWeight: '700'}} >Purchases</li>
            </ul>
      <h2 className='purchases__title'>My Purchases</h2>
      <div className='purchases__content'>
        {
          purchases?.map(purchase => <CardPurchases key={purchase.id} purchase={purchase}/> )

        }
      </div>
    </div>

  )
}

export default Purchases