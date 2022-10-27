import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CardProduct from '../components/home/CardProduct'
import FilterSide from '../components/home/FilterSide'
import Footer from '../components/shared/Footer'
import SearchProducts from '../components/shared/SearchProducts'
import { getProducts } from '../store/slices/products.slice'
import { setSearchGlobal } from '../store/slices/search.slice'
import getSearch from '../utils/getSearch'
import './styles/home.css'

const Home = () => {

  const searchFilter = useSelector(state => state.search)
  const products = useSelector(state => state.products)
  const [showFilter,setShowFilter] = useState(false)
  const { filter } = useParams()

  const dispatch = useDispatch()

 
  useEffect(() => {
    if(filter){
    dispatch(setSearchGlobal(['price', filter.split('-')[0], filter.split('-')[1]]))
  }
  }, [filter])
  

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const handleShowFilter = () => {
      setShowFilter(!showFilter)
    
}

  return (
    <main className='home-container'>
      <div className='home-content'>
        <FilterSide showFilter={showFilter} />
        <div className='home__products-container'>
          <div onClick={handleShowFilter} className='home__filter-content'>
            <span className='home__filter'><i className='bx bx-filter-alt' ></i>Filter</span>
          </div>
          <div className='home__products'>
            {
            getSearch(products,searchFilter)?.map(product => (<CardProduct key={product.id} product={product} />))
            }
          </div>

        </div>

      </div>
    </main>
  )
}

export default Home